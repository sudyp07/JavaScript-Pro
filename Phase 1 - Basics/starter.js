// JavaScript Basics - Starter
// Author: Sudip Nepal

// 1. Output
console.log("Hello, JavaScript!");
console.log("Welcome to JavaScript revision.");

// 2. Variables
let name = "Sudip";
let age = 21;
const country = "Nepal";

console.log(name);
console.log(age);
console.log(country);

// 3. Basic Data Types
let fullName = "Sudip Nepal"; // String
let studentAge = 21;          // Number
let isStudent = true;         // Boolean
let score;                    // Undefined
let emptyValue = null;        // Null

console.log(fullName);
console.log(studentAge);
console.log(isStudent);
console.log(score);
console.log(emptyValue);

// 4. Basic Arithmetic
let a = 10;
let b = 5;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);

// 5. String Concatenation
let firstName = "Sudip";
let lastName = "Nepal";

console.log(firstName + " " + lastName);

// 6. Template Literals
console.log(`My name is ${firstName} ${lastName}.`);
console.log(`I am ${studentAge} years old.`);

// 7. Basic Comparison
console.log(10 > 5);
console.log(10 < 5);
console.log(10 === 10);
console.log(10 !== 5);

// 8. Basic Condition
let marks = 85;

if (marks >= 40) {
    console.log("Passed");
} else {
    console.log("Failed");
}

// 9. Basic Function
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("Sudip");

// 10. Simple Calculation Function
function add(x, y) {
    return x + y;
}

console.log("Result:", add(10, 20));

// End of JavaScript Basics Starter