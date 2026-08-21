// 03-variables.js - Working with variables in JavaScript

// Variable declaration using let (can be changed)
let name = "John";
console.log(name); // John

name = "Mike"; // Reassigning
console.log(name); // Mike

// Variable declaration using const (cannot be changed)
const birthYear = 2003;
console.log(birthYear); // 2003

// birthYear = 2001; // Error! Cannot reassign const

// Variable declaration using var (old way, avoid using)
var oldWay = "This is old";
console.log(oldWay);

// Naming rules
let firstName = "Jane"; // Camel case (recommended)
let user_age = 25;      // Snake case
let $price = 99;        // Can use $
let _hidden = "secret"; // Can use _

// Cannot start with number
// let 1name = "Error"; // This will cause error

// Case sensitive
let city = "London";
let City = "Paris"; // Different variable
console.log(city); // London
console.log(City); // Paris

// Variable without value (undefined)
let x;
console.log(x); // undefined

// Multiple variables in one line
let a = 5, b = 10, c = 15;
console.log(a, b, c);

// Variables can hold different data types
let value = "Hello"; // String
console.log(typeof value);

value = 100; // Now number
console.log(typeof value);

value = true; // Now boolean
console.log(typeof value);