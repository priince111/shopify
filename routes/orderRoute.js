const {Router} = require('express');
const orderController = require('../controllers/orderController');
const router = Router();

router.get('/:id',orderController.get_orders);
router.post('/:id',orderController.checkout);

module.exports = router;