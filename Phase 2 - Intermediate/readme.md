```markdown
# Phase 2 - Intermediate JavaScript

This folder contains intermediate JavaScript concepts that build upon the fundamentals. It bridges the gap between basic syntax and advanced programming patterns.

---

## 📚 Topics Covered

### 1. Advanced Arrays (`21-arrays-advanced.js`)

- Array destructuring
- Spread operator with arrays
- Advanced array methods (`map()`, `filter()`, `reduce()`)
- Array sorting with custom comparators
- `Array.from()` and `Array.of()`
- Working with array-like objects
- `every()`, `some()`, `find()`, `findIndex()`
- `flat()` and `flatMap()`

Examples:
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### 2. Advanced Objects (`22-objects-advanced.js`)

- Object destructuring
- Computed property names
- Object methods (`Object.assign()`, `Object.freeze()`, `Object.seal()`)
- Prototypes and inheritance
- Getters and setters
- Object property descriptors
- `Object.keys()`, `Object.values()`, `Object.entries()`
- `Object.hasOwn()`

Examples:
```js
const person = { name: "John", age: 30 };
const { name, age } = person;
console.log(name, age);
```

### 3. Advanced String Methods (`23-string-methods.js`)

- Template literals
- String interpolation
- Advanced string manipulation
- Regular expressions
- Unicode and character encoding
- `match()`, `search()`, `replace()`
- `startsWith()`, `endsWith()`, `includes()`
- `padStart()`, `padEnd()`

Examples:
```js
const text = "Hello World";
console.log(text.includes("World")); // true
console.log(text.replace("World", "JavaScript"));
```

### 4. Advanced Numbers & Math (`24-numbers-math-advanced.js`)

- Number precision and rounding
- `Math` object advanced methods
- Random number generation
- `BigInt` operations
- Number formatting (`toLocaleString()`)
- `Number.isInteger()`, `Number.isFinite()`
- `Math.floor()`, `Math.ceil()`, `Math.round()`

Examples:
```js
console.log(Math.floor(Math.random() * 10) + 1);
console.log((1234567.89).toLocaleString());
```

### 5. Dates & Time (`25-dates.js`)

- Creating and manipulating dates
- Date formatting
- Time zones and UTC
- Date calculations
- Working with timestamps
- `new Date()`, `Date.now()`
- `getFullYear()`, `getMonth()`, `getDate()`
- `toLocaleDateString()`, `toLocaleTimeString()`

Examples:
```js
const now = new Date();
console.log(now.toLocaleDateString());
console.log(now.getTime());
```

### 6. JSON (`26-json.js`)

- `JSON.parse()` and `JSON.stringify()`
- Handling nested objects
- JSON validation
- JSON with dates and functions
- Pretty printing JSON
- Error handling with JSON

Examples:
```js
const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj.name);
```

### 7. Error Handling (`27-error-handling.js`)

- `try/catch/finally` blocks
- Custom error types
- Error object properties
- Error propagation
- `throw` statement
- Best practices for error handling

Examples:
```js
try {
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error("Error:", error.message);
} finally {
    console.log("Cleanup");
}
```

### 8. Arrow Functions (`28-arrow-functions.js`)

- Syntax and usage
- Lexical `this` binding
- When to use (and not use) arrow functions
- Arrow functions in callbacks
- Implicit returns
- Arrow functions vs traditional functions

Examples:
```js
const add = (a, b) => a + b;
const square = x => x * x;
console.log(add(5, 3));
```

### 9. Higher-Order Functions (`29-higher-order-functions.js`)

- `map()`, `filter()`, `reduce()`
- `forEach()`, `find()`, `findIndex()`
- `some()`, `every()`
- `sort()` with custom comparators
- Chaining higher-order functions
- Functional programming concepts

Examples:
```js
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### 10. Callbacks (`30-callbacks.js`)

- Callback function patterns
- Asynchronous callbacks
- Callback hell and pyramid of doom
- Error-first callbacks
- `setTimeout()` and `setInterval()`
- Event-driven programming

Examples:
```js
setTimeout(() => {
    console.log("Delayed message");
}, 1000);

function processData(data, callback) {
    const result = data * 2;
    callback(result);
}
```

### 11. Promises (`31-promises.js`)

- Promise creation and consumption
- Promise chaining
- `Promise.all()`, `Promise.race()`
- `async/await` syntax
- Error handling with promises
- Fetch API with promises

Examples:
```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success"), 1000);
});

async function fetchData() {
    try {
        const data = await fetch("https://api.example.com");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 📁 Suggested Structure

```text
02-intermediate/
│
├── 21-arrays-advanced.js
├── 22-objects-advanced.js
├── 23-string-methods.js
├── 24-numbers-math-advanced.js
├── 25-dates.js
├── 26-json.js
├── 27-error-handling.js
├── 28-arrow-functions.js
├── 29-higher-order-functions.js
├── 30-callbacks.js
├── 31-promises.js
└── README.md
```

The files can be added progressively as each topic is revised.

---

## ▶️ Running JavaScript Files

If Node.js is installed, run a file from this directory using:

```bash
node 21-arrays-advanced.js
```

For example:

```bash
node 25-dates.js
```

---

## 🧪 Practice Problems

After completing the concepts, practice with small programs such as:

### Array Practice
- Find the second largest number in an array
- Remove duplicates from an array
- Flatten a nested array
- Group objects by property

### Object Practice
- Create a deep clone function
- Merge multiple objects
- Create a class with getters and setters
- Implement inheritance with prototypes

### String Practice
- Validate email addresses using regex
- Count word frequency in a string
- Check for palindromes
- Extract URLs from text

### Date Practice
- Calculate age from birthdate
- Find the difference between two dates
- Format dates in different locales
- Create a countdown timer

### Error Handling Practice
- Create a custom error class
- Handle API errors gracefully
- Implement retry logic with promises

### Async Practice
- Fetch data from multiple APIs
- Handle concurrent requests with Promise.all()
- Implement a delay function
- Create a simple async queue

### Challenge Solutions
```js
// 1. Remove duplicates from array
const removeDuplicates = arr => [...new Set(arr)];

// 2. Deep clone function
const deepClone = obj => JSON.parse(JSON.stringify(obj));

// 3. Calculate age
const calculateAge = birthDate => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return new Date(diff).getFullYear() - 1970;
};

// 4. Count word frequency
const wordFrequency = str => {
    return str.split(/\s+/).reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});
};
```

---

## 🎯 Revision Goal

By completing this folder, you should be comfortable with:

- Advanced array manipulation and methods
- Object manipulation and prototypes
- String operations and regular expressions
- Working with numbers and mathematical operations
- Handling dates and time zones
- Parsing and stringifying JSON
- Implementing error handling
- Using arrow functions effectively
- Applying higher-order functions
- Understanding callback patterns
- Working with promises and async/await

---

## 🚀 Next Step

After completing the intermediate concepts, continue to the next section of the repository to explore more advanced JavaScript concepts including:

- **ES6+ Features**: Classes, modules, iterators, generators
- **Asynchronous Programming**: Event loop, promises, async/await
- **Functional Programming**: Currying, composition, pure functions
- **Object-Oriented Programming**: Classes, inheritance, polymorphism
- **Design Patterns**: Common patterns in JavaScript
- **Working with APIs**: Fetch, REST, authentication
- **DOM Manipulation**: Browser APIs, events, rendering
- **JavaScript in Node.js**: File system, streams, modules

---
**Understand → Practice → Build → Revise**
