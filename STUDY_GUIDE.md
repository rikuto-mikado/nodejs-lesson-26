# Study Guide - Node.js Lesson 26

Quick reference for mastering key concepts from this lesson.

---

## MVC Architecture

**Pattern:** Separate concerns into Model, View, Controller

| Component | Purpose | Example |
|-----------|---------|---------|
| Model | Data + Business Logic | `Product.save()`, `Product.fetchAll()` |
| View | UI/Presentation | `shop.ejs`, `add-product.ejs` |
| Controller | Request Handling | `exports.getProducts = (req, res) => {...}` |

**Flow:**
```
Request → Route → Controller → Model → Controller → View → Response
```

---

## Async File Operations

### fs.readFile()
```javascript
fs.readFile(path, (err, fileContent) => {
    if (err) {
        // Handle error
    } else {
        const data = JSON.parse(fileContent);
        // Use data
    }
});
```

### fs.writeFile()
```javascript
fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) console.log(err);
});
```

**Key Points:**
- Operations are **asynchronous** (non-blocking)
- Use **callbacks** to handle results
- Cannot `return` directly from async operations

---

## Callback Pattern

### Why Callbacks?

```javascript
// WRONG - Returns undefined
static fetchAll() {
    fs.readFile(path, (err, content) => {
        return JSON.parse(content);  // Returns to callback, not fetchAll
    });
}

// CORRECT - Use callback
static fetchAll(cb) {
    fs.readFile(path, (err, content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(content));
        }
    });
}

// Usage
Product.fetchAll((products) => {
    // Data available here
});
```

**Rule:** Async operations require callbacks because data isn't ready immediately.

---

## Error Handling in Callbacks

### With else:
```javascript
if (err) {
    cb([]);
} else {
    cb(data);
}
```

### With early return:
```javascript
if (err) {
    return cb([]);
}
cb(data);
```

Both prevent calling callback twice.

---

## ES6 Class vs Constructor Function

### Constructor Function:
```javascript
function Product(title) {
    this.title = title;  // Function body IS the constructor
}
```

### ES6 Class:
```javascript
class Product {
    constructor(title) {  // constructor() keyword only in classes
        this.title = title;
    }
}
```

**Key:** `constructor()` keyword only exists in ES6 classes.

---

## Common Patterns

### Read → Modify → Write
```javascript
save() {
    fs.readFile(path, (err, content) => {
        let data = err ? [] : JSON.parse(content);
        data.push(this);
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) console.log(err);
        });
    });
}
```

### Static Method with Callback
```javascript
static fetchAll(cb) {
    fs.readFile(path, (err, content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(content));
        }
    });
}
```

### Controller Using Model
```javascript
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', { prods: products });
    });
};
```

---

## Quick Test Questions

1. **What are the three components of MVC?**
   - Model (data/logic), View (UI), Controller (request handling)

2. **Why can't you `return` from async operations?**
   - Data isn't ready when function returns; use callbacks instead

3. **What's the difference between `fs.readFile` and `fs.readFileSync`?**
   - `readFile` is async (non-blocking), `readFileSync` is sync (blocking)

4. **When do you use `static` methods?**
   - For class-level operations that don't require instance data (e.g., `fetchAll()`)

5. **How do you prevent calling a callback twice?**
   - Use `else` or `return` in error handling

---

## Express.js + EJS Integration

### Route Setup:
```javascript
const productsController = require('./controllers/products');

app.get('/', productsController.getProducts);
app.post('/admin/add-product', productsController.postAddProduct);
```

### Controller:
```javascript
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', { prods: products });
    });
};
```

### View (EJS):
```html
<% prods.forEach(product => { %>
    <h1><%= product.title %></h1>
<% }); %>
```

---

## Common Mistakes to Avoid

1. Mixing constructor function and class syntax
2. Using `return` in async callbacks expecting it to return from outer function
3. Calling callback twice (missing `else` or `return`)
4. Using `process.mainModule.filename` (deprecated, use `require.main.filename`)
5. Forgetting to handle errors in file operations
