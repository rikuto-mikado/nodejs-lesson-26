// File System module - used to save/load products to/from a JSON file
const fs = require('fs');
const path = require('path');

// Product class exported as a module
// Create instances using: new Product(title)
// See README.md for explanation of constructor patterns
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // Build file path: /project-root/data/products.json
        // (Same path used in both save() and fetchAll() to access the same file)
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    // Static method to fetch all products from the JSON file
    static fetchAll(cb) {
        // Build file path: /project-root/data/products.json
        // (Same path used in both save() and fetchAll() to access the same file)
        const p = path.join(
            path.dirname(require.main.filename),
            'data',
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }
}