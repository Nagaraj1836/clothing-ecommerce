const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrderById } = require('../controllers/orderController');

router.use(protect);
router.post('/', createOrder);
router.get('/:id', getOrderById);

module.exports = router;
