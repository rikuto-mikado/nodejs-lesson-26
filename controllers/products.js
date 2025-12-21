// Array to store all products in memory (temporary storage, will be replaced with database later)
const products = [];

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
    products.push({ title: req.body.title });
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