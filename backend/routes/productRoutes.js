const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

router.post('/', protect, upload.array('images', 5), createProduct);
router.put('/:id', protect, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
