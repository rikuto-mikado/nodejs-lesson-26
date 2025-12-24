const products = [];

// Product class exported as a module
// Create instances using: new Product(title)
// See README.md for explanation of constructor patterns
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        products.push(this);
    }

    // Static method - called on the class itself, not on instances
    // Usage: Product.fetchAll() (NOT: product.fetchAll())
    // Used for utility functions that don't require instance data
    static fetchAll() {
        return this.products;
    }
}