# Node.js Lesson 26

## What I Learned

### MVC Architecture Pattern

This project follows the **MVC (Model-View-Controller)** pattern to separate concerns and organize code.

| Component | Responsibility | Location | Example |
|-----------|---------------|----------|---------|
| **Model** | Data structure and business logic | `models/` | `Product` class with `save()`, `fetchAll()` |
| **View** | User interface (HTML templates) | `views/` | `shop.ejs`, `add-product.ejs` |
| **Controller** | Handles requests, coordinates Model & View | `controllers/` | `getProducts()`, `postAddProduct()` |

#### How They Work Together:

```
User Request (e.g., GET /)
    ↓
Route matches request → calls Controller
    ↓
Controller asks Model for data
    ↓
Model reads from file/database → returns data
    ↓
Controller passes data to View
    ↓
View renders HTML with data
    ↓
Response sent to User
```

#### Code Example:

**Model** (`models/product.js`):
```javascript
class Product {
    save() { /* Save to file */ }
    static fetchAll(cb) { /* Read from file */ }
}
```

**Controller** (`controllers/products.js`):
```javascript
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {  // Get data from Model
        res.render('shop', { prods: products });  // Pass to View
    });
};
```

**View** (`views/shop.ejs`):
```html
<% prods.forEach(product => { %>
    <h1><%= product.title %></h1>
<% }); %>
```

**Key Takeaway:**
MVC separates **data** (Model), **presentation** (View), and **logic** (Controller), making code easier to maintain and test.

---

## What Was Difficult

### ES6 Class vs Constructor Function - Understanding the Syntax

| Pattern | Syntax | Valid? |
|---------|--------|--------|
| Constructor Function | `function Product(t) { this.title = t; }` | Yes |
| ES6 Class | `class Product { constructor(t) { this.title = t; } }` | Yes |
| **Mixed (WRONG)** | `function Product(t) { constructor(t) { this.title = t; } }` | No |

#### The Problem:
```javascript
// INCORRECT - Syntax Error
module.exports = function Product(title) {
    constructor(title) {  // ERROR: Can't use method syntax inside a function
        this.title = title;
    }
}
```

#### Why It's Wrong:
- `constructor()` is a **special method keyword** only for ES6 classes
- Cannot use method syntax inside a regular function
- Mixing two different patterns

#### Correct Solutions:

**Option 1 - Constructor Function:**
```javascript
module.exports = function Product(title) {
    this.title = title;  // Function body IS the constructor
}
```

**Option 2 - ES6 Class:**
```javascript
module.exports = class Product {
    constructor(title) {  // constructor() only valid inside class
        this.title = title;
    }
}
```

**Key Takeaway:**
The `constructor()` keyword only exists within class definitions. In constructor functions, the function body itself serves as the constructor logic.

---

### File System Operations - Asynchronous Callbacks

#### Why Use Callbacks?

Node.js file operations (`fs.readFile`, `fs.writeFile`) are **asynchronous** - they don't block code execution. Results are returned via **callbacks**.

| Method | Purpose | When to Use |
|--------|---------|-------------|
| `fs.readFile(path, callback)` | Read file content | Load data before processing |
| `fs.writeFile(path, data, callback)` | Write/overwrite file | Save data to disk |

#### The Pattern:

```javascript
// 1. Read existing data
fs.readFile(path, (err, fileContent) => {
    let data = [];
    if (!err) {
        data = JSON.parse(fileContent);  // Parse JSON → Array
    }

    // 2. Modify data
    data.push(newItem);

    // 3. Write back to file
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) console.log(err);
    });
});
```

#### Why `static fetchAll(cb)` Uses a Callback:

```javascript
// WRONG - Can't return directly from async operation
static fetchAll() {
    fs.readFile(path, (err, content) => {
        return JSON.parse(content);  // Returns to readFile callback, not fetchAll
    });
    // fetchAll returns undefined here
}

// CORRECT - Use callback to pass data when ready
static fetchAll(cb) {
    fs.readFile(path, (err, content) => {
        cb(JSON.parse(content));  // Pass data to callback when ready
    });
}

// Usage
Product.fetchAll((products) => {
    console.log(products);  // Data available here
});
```

#### The Flow:

```
Controller calls fetchAll()
    ↓
fetchAll() starts reading file (async)
    ↓
File read completes → callback fires
    ↓
Parsed data passed to controller's callback
    ↓
Controller renders view with data
```

**Key Takeaway:**
Asynchronous operations require callbacks because you can't `return` values that aren't ready yet. The callback pattern ensures data is only used after it's available.

---

## Memo

This lesson focused on implementing the **MVC (Model-View-Controller)** pattern to separate data logic, presentation, and request handling. I learned how to use **asynchronous file operations** (`fs.readFile`, `fs.writeFile`) with callbacks to persist data to JSON files instead of keeping it in memory. A key insight was understanding why `return` doesn't work with async operations - callbacks are required to handle data that isn't available immediately. I also clarified the difference between ES6 classes (which use the `constructor()` keyword) and constructor functions (where the function body itself serves as the constructor).
