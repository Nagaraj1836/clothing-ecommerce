const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  const userId = req.user._id;
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  res.json(cart);
};

// Add or update item server-side
const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, size, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  const idx = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);
  if (idx > -1) {
    cart.items[idx].qty = qty;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      size,
      qty,
      price: product.price,
      image: product.image
    });
  }
  await cart.save();
  res.json(cart);
};

const updateCart = async (req, res) => {
  const userId = req.user._id;
  const { items } = req.body; // full items array
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  cart.items = items; // expect validated structure
  await cart.save();
  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => i._id.toString() !== itemId);
  await cart.save();
  res.json(cart);
};

module.exports = { getCart, addToCart, updateCart, removeFromCart };
