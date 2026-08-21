// 09-numbers-math.js - Working with numbers and math in JavaScript

// Number creation
let intNum = 42;
let floatNum = 3.14;
let negativeNum = -10;
let bigNum = 1e6; // 1000000
let smallNum = 1e-3; // 0.001
let hexNum = 0xFF; // 255
let binaryNum = 0b1010; // 10
let octalNum = 0o744; // 484

// Special numbers
console.log(Infinity);
console.log(-Infinity);
console.log(NaN); // Not a Number

// Checking if number is integer
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(3.14)); // false

// Checking if number is finite
console.log(Number.isFinite(100)); // true
console.log(Number.isFinite(Infinity)); // false

// Checking for NaN
let notNumber = "hello" / 2;
console.log(isNaN(notNumber)); // true
console.log(Number.isNaN(notNumber)); // true

// Number parsing
console.log(parseInt("42")); // 42
console.log(parseFloat("3.14")); // 3.14
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14px")); // 3.14
console.log(Number("42")); // 42

// Rounding
let num = 3.7;
console.log(Math.round(num)); // 4 (round to nearest)
console.log(Math.floor(num)); // 3 (round down)
console.log(Math.ceil(num)); // 4 (round up)
console.log(Math.trunc(num)); // 3 (remove decimal)

// Rounding to decimal places
let pi = 3.14159;
console.log(pi.toFixed(2)); // "3.14" (returns string)
console.log(pi.toPrecision(3)); // "3.14" (returns string)

// Math constants
console.log(Math.PI); // 3.141592653589793
console.log(Math.E); // 2.718281828459045
console.log(Math.SQRT2); // 1.4142135623730951

// Basic math operations
console.log(Math.abs(-5)); // 5 (absolute value)
console.log(Math.pow(2, 3)); // 8 (2^3)
console.log(Math.sqrt(16)); // 4 (square root)
console.log(Math.cbrt(27)); // 3 (cube root)

// Min and max
console.log(Math.min(1, 2, 3, 4, 5)); // 1
console.log(Math.max(1, 2, 3, 4, 5)); // 5

// Random numbers
console.log(Math.random()); // Random number between 0 and 1
console.log(Math.floor(Math.random() * 10)); // Random integer 0-9
console.log(Math.floor(Math.random() * 10) + 1); // Random integer 1-10

// Trigonometric functions
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(0)); // 1
console.log(Math.tan(Math.PI / 4)); // ~1

// Exponential and logarithmic
console.log(Math.exp(1)); // 2.718...
console.log(Math.log(10)); // Natural log of 10
console.log(Math.log2(8)); // 3 (log base 2)
console.log(Math.log10(100)); // 2 (log base 10)

// Number properties
console.log(Number.MAX_VALUE); // Largest number
console.log(Number.MIN_VALUE); // Smallest positive number
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Working with large numbers (BigInt)
let bigInt = 9007199254740991n;
console.log(bigInt + 1n); // 9007199254740992n

// Formatting numbers
let amount = 1234567.89;
console.log(amount.toLocaleString()); // "1,234,567.89"
console.log(amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

// Simple calculator functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : "Cannot divide by zero"; }

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(10, 5)); // 50
console.log(divide(10, 5)); // 2
console.log(divide(10, 0)); // "Cannot divide by zero"