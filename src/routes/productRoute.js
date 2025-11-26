const router = require('express').Router();
const productController = require('../controllers/product.controller');
//importing multer middleware
const upload = require('../middlewares/multer.middleware.js');

// route to upload products with array of images
router.post('/upload', upload.array('images', 3), productController.createProduct);
// route to get all products
router.get('/all', productController.getAllProducts);

// route to get product by id
router.get('/:id', productController.getProductById);

// route to update product
router.put('/:id', productController.updateProduct);
//route to upload multiple images for product




module.exports = router;