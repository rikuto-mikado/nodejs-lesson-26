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

## Memo
<!-- Summary to be filled in later (3 sentences) -->
