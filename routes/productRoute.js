const {Router} = require('express')
const productController = require('../controllers/productController');
const router = Router();
router.get('/',productController.get_products);
router.post('/',productController.post_product);
router.put('/:id',productController.update_product);
router.delete('/:id',productController.delete_product);

module.exports = router;