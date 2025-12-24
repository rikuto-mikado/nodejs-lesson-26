const Product = require('../models/product');

// Controller function to render the add product form page
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true 
    });
};

// Controller function to handle product creation from form submission
exports.postAddProduct = (req, res, next) => {
    // Step 1: Create a new Product instance in memory with the title from the form
    // 'new Product()' calls the constructor, setting this.title = req.body.title
    const product = new Product(req.body.title);

    // Step 2: Persist the product by calling its save() method
    // save() pushes this product instance into the products array
    // Separating creation and saving allows for validation or modification before saving
    product.save();

    res.redirect('/');
};

// Controller function to retrieve and display all products on the shop page
exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        layout: false
  });
};