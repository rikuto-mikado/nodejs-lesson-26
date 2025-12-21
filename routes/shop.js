const path = require('path');

const express = require('express');

// Import the products controller to handle shop-related operations
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
