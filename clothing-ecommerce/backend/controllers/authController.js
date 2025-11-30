const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User exists' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ id: user._id, name: user.name, email: user.email });
};

const logout = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ message: 'Logged out' });
};

module.exports = { register, login, logout };
