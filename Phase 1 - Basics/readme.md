# JavaScript Basics

This folder contains the fundamental concepts of JavaScript. It is the starting point for understanding how JavaScript works and building a strong foundation before moving to advanced topics.

---

## 📚 Topics Covered

### 1. JavaScript Introduction

* What is JavaScript?
* Where JavaScript is used
* JavaScript in the browser
* JavaScript with Node.js
* Running JavaScript code

### 2. Output

* `console.log()`
* `console.error()`
* `console.warn()`
* `console.table()`

### 3. Variables

* `var`
* `let`
* `const`
* Variable naming rules
* Variable reassignment
* Constants

### 4. Data Types

#### Primitive Data Types

* String
* Number
* BigInt
* Boolean
* Undefined
* Null
* Symbol

#### Non-Primitive Data Types

* Object
* Array
* Function

### 5. Type Checking

* `typeof`
* Checking primitive types
* Understanding `typeof null`

### 6. Type Conversion

* String conversion
* Number conversion
* Boolean conversion
* `String()`
* `Number()`
* `Boolean()`
* `parseInt()`
* `parseFloat()`

### 7. Operators

#### Arithmetic Operators

* `+`
* `-`
* `*`
* `/`
* `%`
* `**`
* `++`
* `--`

#### Assignment Operators

* `=`
* `+=`
* `-=`
* `*=`
* `/=`
* `%=`
* `**=`

#### Comparison Operators

* `==`
* `===`
* `!=`
* `!==`
* `>`
* `<`
* `>=`
* `<=`

#### Logical Operators

* `&&`
* `||`
* `!`

#### Other Operators

* Ternary operator `? :`
* Nullish coalescing `??`
* Optional chaining `?.`
* `typeof`
* `instanceof`

### 8. Strings

* Creating strings
* String concatenation
* Template literals
* String interpolation
* Escape characters
* String properties
* Common string methods

Examples:

```js
let name = "Sudip";

console.log(name.length);
console.log(name.toUpperCase());
console.log(name.toLowerCase());
```

### 9. Numbers & Math

* Numbers
* Decimal numbers
* `NaN`
* `Infinity`
* Basic arithmetic
* `Math` object
* Rounding
* Random numbers
* Minimum and maximum values

Examples:

```js
console.log(Math.round(4.6));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.random());
```

### 10. Comments

* Single-line comments
* Multi-line comments
* Writing useful code comments

```js
// Single-line comment

/*
   Multi-line comment
*/
```

### 11. Conditional Statements

* `if`
* `else`
* `else if`
* Nested conditions
* Ternary operator

Example:

```js
let age = 20;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

### 12. Switch Statement

* `switch`
* `case`
* `break`
* `default`

Example:

```js
let day = 1;

switch (day) {
    case 1:
        console.log("Sunday");
        break;

    case 2:
        console.log("Monday");
        break;

    default:
        console.log("Invalid day");
}
```

### 13. Loops

* `for`
* `while`
* `do...while`
* `break`
* `continue`
* Nested loops

Example:

```js
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### 14. Functions

* Function declaration
* Function invocation
* Parameters
* Arguments
* Return values
* Default parameters
* Function expressions
* Arrow functions

Example:

```js
function add(a, b) {
    return a + b;
}

console.log(add(10, 20));
```

### 15. Scope

* Global scope
* Function scope
* Block scope
* Scope with `var`
* Scope with `let`
* Scope with `const`

### 16. Basic Arrays

* Creating arrays
* Accessing elements
* Changing elements
* Array length
* Adding and removing elements
* Basic array methods

```js
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);
console.log(fruits.length);
```

### 17. Basic Objects

* Creating objects
* Properties
* Accessing properties
* Updating properties
* Adding properties
* Deleting properties
* Dot notation
* Bracket notation

```js
let student = {
    name: "Sudip",
    age: 21,
    country: "Nepal"
};

console.log(student.name);
```

### 18. Input & Basic Interaction

* Browser `prompt()`
* Browser `alert()`
* Browser `confirm()`
* Reading values
* Converting user input

Example:

```js
let name = prompt("Enter your name:");

alert(`Hello, ${name}!`);
```

> `prompt()`, `alert()`, and `confirm()` are browser APIs and are not available directly in standard Node.js execution.

### 19. Truthy & Falsy Values

Understanding values that behave as `true` or `false` in conditions.

Common falsy values:

```text
false
0
-0
0n
""
null
undefined
NaN
```

### 20. Strict vs Loose Equality

Understanding the difference between:

```js
10 == "10";   // true
10 === "10";  // false
```

Prefer strict equality (`===`) when appropriate.

---

## 📁 Suggested Structure

```text
01-basics/
│
├── starter.js
├── 01-introduction.js
├── 02-output.js
├── 03-variables.js
├── 04-data-types.js
├── 05-type-checking.js
├── 06-type-conversion.js
├── 07-operators.js
├── 08-strings.js
├── 09-numbers-math.js
├── 10-comments.js
├── 11-conditionals.js
├── 12-switch.js
├── 13-loops.js
├── 14-functions.js
├── 15-scope.js
├── 16-arrays.js
├── 17-objects.js
├── 18-input.js
├── 19-truthy-falsy.js
├── 20-equality.js
└── README.md
```

The files can be added progressively as each topic is revised.

---

## ▶️ Running JavaScript Files

If Node.js is installed, run a file from this directory using:

```bash
node starter.js
```

For example:

```bash
node 03-variables.js
```

---

## 🧪 Practice

After completing the concepts, practice with small programs such as:

* Check whether a number is positive, negative, or zero
* Check whether a number is even or odd
* Find the largest of three numbers
* Calculate the average of numbers
* Create a simple calculator
* Generate a multiplication table
* Calculate factorial
* Reverse a string
* Count characters in a string
* Find the largest number in an array
* Create and manipulate a student object
* Build a simple grade calculator

---

## 🎯 Revision Goal

By completing this folder, you should be comfortable with:

* Writing and executing basic JavaScript
* Declaring and using variables
* Understanding JavaScript data types
* Performing calculations
* Working with strings and numbers
* Using operators
* Making decisions with conditions
* Repeating code with loops
* Creating and using functions
* Understanding basic scope
* Working with arrays and objects
* Converting between data types
* Understanding truthy and falsy values
* Writing small JavaScript programs independently

---

## 🚀 Next Step

After completing the basics, continue to the next section of the repository and gradually move toward more advanced JavaScript concepts.

**Understand → Practice → Build → Revise**
