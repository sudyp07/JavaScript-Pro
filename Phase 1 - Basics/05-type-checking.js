// 05-type-checking.js - Checking data types in JavaScript

// Using typeof operator
console.log(typeof "Hello");     // string
console.log(typeof 42);          // number
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof null);        // object (JavaScript bug)
console.log(typeof {});          // object
console.log(typeof []);          // object (arrays are objects)
console.log(typeof function(){}); // function

// Better way to check null
let value = null;
console.log(value === null); // true

// Checking arrays
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
console.log(Array.isArray({}));  // false

// Checking if variable exists
let name = "John";
console.log(typeof name !== "undefined"); // true

let something;
console.log(typeof something !== "undefined"); // false

// Checking for NaN (Not a Number)
let num = "hello" / 2;
console.log(isNaN(num)); // true
console.log(isNaN(42));  // false
console.log(isNaN("42")); // false (converts to number first)

// Number.isNaN() - More strict
console.log(Number.isNaN("hello" / 2)); // true
console.log(Number.isNaN("42")); // false
console.log(Number.isNaN(42)); // false

// Checking if value is finite number
console.log(Number.isFinite(42)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite("42")); // false

// instanceof - Check object type
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log("hello" instanceof String); // false (string primitive)

// Checking if a property exists
let person = { name: "John", age: 25 };
console.log("name" in person); // true
console.log("city" in person); // false

// Checking if variable has a value
function checkValue(value) {
    if (value) {
        console.log("Has value:", value);
    } else {
        console.log("Empty or falsy");
    }
}

checkValue("Hello"); // Has value
checkValue(""); // Empty or falsy
checkValue(0); // Empty or falsy
checkValue(null); // Empty or falsy
checkValue(undefined); // Empty or falsy
checkValue(true); // Has value