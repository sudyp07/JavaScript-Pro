// 10-comments.js - Using comments in JavaScript

// This is a single-line comment
// It starts with two slashes
// Everything after // is ignored by JavaScript

// Single-line comment at the end of a line
let name = "John"; // This is a comment explaining the variable

/*
   This is a multi-line comment
   It can span multiple lines
   Everything between /* and * / is ignored
   Useful for longer explanations
*/

/*
   Multi-line comments can also be used to
   temporarily disable code blocks
*/

// Comments for documentation
/**
 * This is a JSDoc style comment
 * Used for documenting functions and their parameters
 * @param {string} name - The person's name
 * @param {number} age - The person's age
 * @returns {string} A greeting message
 */
function greet(name, age) {
    return `Hello ${name}, you are ${age} years old`;
}

// Commenting out code
// console.log("This code is commented out");
console.log("This code runs"); // This line runs

// Comments can explain complex logic
let total = 0;
// Calculate the sum of numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
    total += i; // Add current number to total
}
console.log(total); // 55

// Comments can contain TODO notes
// TODO: Add error handling
// FIXME: Fix performance issue
// NOTE: This function will be updated later

// Comments can include examples
// Example: greet("Alice", 25) // Returns "Hello Alice, you are 25 years old"

// Comments can describe data structures
// User object: { id: number, name: string, email: string }
let user = {
    id: 1,
    name: "John",
    email: "john@example.com"
};

// Avoid unnecessary comments (code should be self-explanatory)
// Bad: let x = 5; // Set x to 5
// Good: let age = 5; // Clear variable name

// Comments can include URLs and references
// https://developer.mozilla.org/en-US/docs/Web/JavaScript
// Reference: Chapter 3 of JavaScript: The Definitive Guide