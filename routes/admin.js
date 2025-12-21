const path = require('path');

const express = require('express');

// Import the products controller which handles the business logic for product-related operations
const productsController = require('../controllers/products');

const router = express.Router();

// GET /admin/add-product - Route to display the add product form
router.get('/add-product', productsController.getAddProduct);

// POST /admin/add-product - Route to handle form submission and create a new product
router.post('/add-product', productsController.postAddProduct);

// Export the router to be mounted in the main app
module.exports = router;
