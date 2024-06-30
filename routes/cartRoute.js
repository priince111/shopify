const {Router} = require('express');
const cartController = require('../controllers/cartController');
const router = Router();

router.get('/:id',cartController.get_cart_items);
router.post('/:id',cartController.add_cart_item);
router.delete('/:userId/:productId',cartController.delete_cart_item);

module.exports = router;


