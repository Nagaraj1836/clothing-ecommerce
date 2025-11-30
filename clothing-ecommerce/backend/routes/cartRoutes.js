const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');

router.use(protect); // all cart routes protected (server-side cart)
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/remove/:itemId', removeFromCart);

module.exports = router;
