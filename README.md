# Node.js Lesson 26

## What I Learned
<!-- To be filled in later -->

---

## What Was Difficult

### ES6 Class vs Constructor Function - Understanding the Syntax

| Pattern | Syntax | Valid? |
|---------|--------|--------|
| Constructor Function | `function Product(t) { this.title = t; }` | ✓ |
| ES6 Class | `class Product { constructor(t) { this.title = t; } }` | ✓ |
| **Mixed (WRONG)** | `function Product(t) { constructor(t) { this.title = t; } }` | ❌ |

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

**Key Takeaway:** The `constructor()` keyword only exists within class definitions. In constructor functions, the function body itself serves as the constructor logic.

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
        cb(JSON.parse(content));  // ✓ Pass data to callback when ready
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

**Key Takeaway:** Asynchronous operations require callbacks because you can't `return` values that aren't ready yet. The callback pattern ensures data is only used after it's available.

---

## Memo
<!-- Summary to be filled in later (3 sentences) -->
