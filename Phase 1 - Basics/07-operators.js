// 07-operators.js - Different operators in JavaScript

// Arithmetic Operators
console.log(5 + 3);  // 8 (Addition)
console.log(5 - 3);  // 2 (Subtraction)
console.log(5 * 3);  // 15 (Multiplication)
console.log(5 / 3);  // 1.666... (Division)
console.log(5 % 3);  // 2 (Modulus/Remainder)
console.log(5 ** 3); // 125 (Exponentiation)

// Increment/Decrement
let x = 5;
x++; // Post-increment (x becomes 6)
console.log(x); // 6
++x; // Pre-increment (x becomes 7)
console.log(x); // 7
x--; // Post-decrement (x becomes 6)
console.log(x); // 6
--x; // Pre-decrement (x becomes 5)
console.log(x); // 5

// Assignment Operators
let y = 10;
y += 5;  // y = y + 5 (15)
console.log(y);
y -= 3;  // y = y - 3 (12)
console.log(y);
y *= 2;  // y = y * 2 (24)
console.log(y);
y /= 4;  // y = y / 4 (6)
console.log(y);
y %= 4;  // y = y % 4 (2)
console.log(y);
y **= 3; // y = y ** 3 (8)
console.log(y);

// Comparison Operators
console.log(5 == 5);   // true (equal value)
console.log(5 == "5"); // true (type coercion)
console.log(5 === 5);  // true (equal value and type)
console.log(5 === "5"); // false (different type)

console.log(5 != 3);   // true (not equal)
console.log(5 != "5"); // false (type coercion)
console.log(5 !== "5"); // true (not equal value or type)

console.log(5 > 3);   // true (greater than)
console.log(5 < 3);   // false (less than)
console.log(5 >= 5);  // true (greater than or equal)
console.log(5 <= 3);  // false (less than or equal)

// Logical Operators
let a = true;
let b = false;

console.log(a && b); // false (AND - both must be true)
console.log(a || b); // true (OR - at least one true)
console.log(!a); // false (NOT - reverses)

// Logical with non-boolean values
console.log(5 && 3); // 3 (returns last truthy)
console.log(0 && 5); // 0 (returns first falsy)
console.log(5 || 3); // 5 (returns first truthy)
console.log(0 || 5); // 5 (returns first truthy)

// String Operators
console.log("Hello" + " " + "World"); // Concatenation
console.log("Hello " + "World"); // "Hello World"

// Ternary Operator (conditional)
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Type Operators
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (arrays are objects)
console.log(typeof function(){}); // "function"

// instanceof operator
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true

// Nullish Coalescing Operator (??)
let userInput = null;
let defaultValue = "Default";
let result = userInput ?? defaultValue;
console.log(result); // "Default"

// Optional Chaining (?.)
let user = { name: "John", address: { city: "NYC" } };
console.log(user?.address?.city); // "NYC"
console.log(user?.contact?.phone); // undefined (no error)

// Bitwise Operators
console.log(5 & 3);  // 1 (AND)
console.log(5 | 3);  // 7 (OR)
console.log(5 ^ 3);  // 6 (XOR)
console.log(~5);     // -6 (NOT)
console.log(5 << 1); // 10 (left shift)
console.log(5 >> 1); // 2 (right shift)