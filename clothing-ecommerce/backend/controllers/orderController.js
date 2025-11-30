const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderEmail } = require('../utils/sendEmail');

const createOrder = async (req, res) => {
  const userId = req.user._id;
  // Option 1: client sends items + total (we validate stock minimally)
  const { items: clientItems, shippingAddress } = req.body;
  if (!clientItems || clientItems.length === 0) return res.status(400).json({ message: 'Cart empty' });

  // Validate product availability (simple)
  for (const item of clientItems) {
    const p = await Product.findById(item.product);
    if (!p) return res.status(400).json({ message: `Product ${item.name} not found` });
    if (p.stock < item.qty) return res.status(400).json({ message: `Insufficient stock for ${p.name}` });
  }

  const totalPrice = clientItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const order = await Order.create({
    user: userId,
    items: clientItems,
    totalPrice,
    shippingAddress
  });

  // Optionally decrement stock
  for (const item of clientItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
  }

  // Clear user's cart
  await Cart.findOneAndDelete({ user: userId });

  // Send confirmation email (fire-and-ignore errors)
  try {
    const user = req.user;
    await sendOrderEmail(order, user);
  } catch (err) {
    console.error('Email error:', err.message);
  }

  res.status(201).json(order);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  // Protect: only owner or admin can view (basic)
  if (order.user && req.user._id.toString() !== order.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json(order);
};

module.exports = { createOrder, getOrderById };
