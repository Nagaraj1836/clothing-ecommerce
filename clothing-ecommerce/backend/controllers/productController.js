const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { search, category, size, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
  const pageNum = parseInt(page, 10);
  const lim = parseInt(limit, 10);

  let query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  if (category && category !== 'All') query.category = category;
  if (size) query.sizes = size;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((pageNum - 1) * lim)
    .limit(lim);

  res.json({ products, total, page: pageNum, pages: Math.ceil(total / lim) });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

module.exports = { getProducts, getProductById };
