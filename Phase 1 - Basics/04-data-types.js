// 04-data-types.js - Different data types in JavaScript

// String - Text values
let name = "John";
let message = 'Hello World';
let template = `My name is ${name}`; // Template literal
console.log(typeof name); // string

// Number - Integers and decimals
let age = 25;
let price = 19.99;
let negative = -5;
console.log(typeof age); // number

// Boolean - true or false
let isStudent = true;
let isAdult = false;
console.log(typeof isStudent); // boolean

// Undefined - Variable declared but no value
let x;
console.log(x); // undefined
console.log(typeof x); // undefined

// Null - Intentionally empty
let y = null;
console.log(y); // null
console.log(typeof y); // object (this is a JavaScript bug)

// Object - Collection of data
let person = {
    name: "John",
    age: 25,
    city: "NYC"
};
console.log(typeof person); // object

// Array - List of values
let colors = ["red", "green", "blue"];
console.log(typeof colors); // object (array is an object)

// Checking data types
console.log(typeof "hello"); // string
console.log(typeof 42); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof {}); // object
console.log(typeof []); // object

// Special numeric values
console.log(10 / 0); // Infinity
console.log(-10 / 0); // -Infinity
console.log("hello" / 2); // NaN (Not a Number)

// Symbol (ES6) - Unique identifier
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false

// BigInt - For very large numbers
let bigNumber = 12345678901234567890n;
console.log(typeof bigNumber); // bigint