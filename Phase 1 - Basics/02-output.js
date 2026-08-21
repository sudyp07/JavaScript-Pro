// 02-output.js - Different ways to output data in JavaScript

// console.log() - Most common way to output
console.log("Hello World");
console.log(42);
console.log(true);
console.log([1, 2, 3]);
console.log({ name: "John", age: 25 });

// console.log() with multiple values
console.log("Number:", 100, "Text:", "Hello");

// console.error() - For error messages (shown in red)
console.error("This is an error message");

// console.warn() - For warnings (shown in yellow)
console.warn("This is a warning message");

// console.info() - For informational messages
console.info("This is an info message");

// console.table() - Display data in table format
console.table(["Apple", "Banana", "Orange"]);
console.table({ name: "John", age: 25, city: "NYC" });

// Alert - Popup box (works in browser, not in Node.js)
// alert("This is an alert!");

// Prompt - Get user input (works in browser, not in Node.js)
// let userInput = prompt("Enter your name:");

// document.write() - Write to HTML page (browser only)
// document.write("Hello from JavaScript");