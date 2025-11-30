const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const products = [
  { name: 'Classic White Tee', description: '100% cotton', price: 499, image: 'https://picsum.photos/seed/tee1/400/400', category: 'Men', sizes: ['S','M','L','XL'], stock: 50 },
  { name: 'Black Hoodie', description: 'Cozy fleece', price: 1299, image: 'https://picsum.photos/seed/hoodie1/400/400', category: 'Unisex', sizes: ['S','M','L'], stock: 30 },
  { name: 'Blue Denim Jeans', description: 'Slim fit', price: 1999, image: 'https://picsum.photos/seed/jeans1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 40 },
  { name: 'Red Summer Dress', description: 'Light & breezy', price: 1599, image: 'https://picsum.photos/seed/dress1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 25 },
  { name: 'Green Chinos', description: 'Smart casual', price: 1399, image: 'https://picsum.photos/seed/chinos1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 35 },
  { name: 'Striped Polo', description: 'Pique cotton', price: 799, image: 'https://picsum.photos/seed/polo1/400/400', category: 'Men', sizes: ['S','M','L','XL'], stock: 40 },
  { name: 'Leather Jacket', description: 'Faux leather', price: 4999, image: 'https://picsum.photos/seed/jacket1/400/400', category: 'Women', sizes: ['M','L'], stock: 10 },
  { name: 'Sports Shorts', description: 'Dry-fit', price: 599, image: 'https://picsum.photos/seed/shorts1/400/400', category: 'Unisex', sizes: ['S','M','L'], stock: 60 },
  { name: 'Winter Coat', description: 'Warm insulated', price: 6999, image: 'https://picsum.photos/seed/coat1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 15 },
  { name: 'Floral Skirt', description: 'A-line', price: 899, image: 'https://picsum.photos/seed/skirt1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 28 },
  { name: 'Denim Jacket', description: 'Classic', price: 2999, image: 'https://picsum.photos/seed/jeansjkt/400/400', category: 'Unisex', sizes: ['S','M','L'], stock: 20 },
  { name: 'Graphic Tee', description: 'Printed design', price: 549, image: 'https://picsum.photos/seed/tee2/400/400', category: 'Men', sizes: ['S','M','L','XL'], stock: 70 },
  { name: 'Yoga Pants', description: 'Stretch', price: 999, image: 'https://picsum.photos/seed/yoga1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 40 },
  { name: 'Chambray Shirt', description: 'Lightweight', price: 1199, image: 'https://picsum.photos/seed/shirt1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 33 },
  { name: 'Bomber Jacket', description: 'Casual', price: 3499, image: 'https://picsum.photos/seed/bomber1/400/400', category: 'Unisex', sizes: ['M','L'], stock: 12 },
  { name: 'Striped Dress', description: 'Midi', price: 1799, image: 'https://picsum.photos/seed/dress2/400/400', category: 'Women', sizes: ['S','M','L'], stock: 18 },
  { name: 'Casual Sneakers', description: 'Comfort sole', price: 2499, image: 'https://picsum.photos/seed/shoes1/400/400', category: 'Unisex', sizes: ['40','41','42','43'], stock: 50 },
  { name: 'Formal Shirt', description: 'Office wear', price: 1299, image: 'https://picsum.photos/seed/formal1/400/400', category: 'Men', sizes: ['M','L','XL'], stock: 25 },
  { name: 'Corduroy Pants', description: 'Retro', price: 1499, image: 'https://picsum.photos/seed/cord1/400/400', category: 'Women', sizes: ['S','M','L'], stock: 22 },
  { name: 'Puffer Vest', description: 'Light warmth', price: 1599, image: 'https://picsum.photos/seed/vest1/400/400', category: 'Unisex', sizes: ['S','M','L'], stock: 30 }
];

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
