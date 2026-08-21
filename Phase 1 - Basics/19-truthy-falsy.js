// 19-truthy-falsy.js - Truthy and Falsy values in JavaScript

// ========== FALSY VALUES ==========
// These values are treated as false in boolean contexts

console.log("=== FALSY VALUES ===");

// 1. false
if (false) {
    console.log("This won't run");
} else {
    console.log("false is falsy");
}

// 2. 0 (zero)
if (0) {
    console.log("This won't run");
} else {
    console.log("0 is falsy");
}

// 3. -0 (negative zero)
if (-0) {
    console.log("This won't run");
} else {
    console.log("-0 is falsy");
}

// 4. "" (empty string)
if ("") {
    console.log("This won't run");
} else {
    console.log('"" (empty string) is falsy');
}

// 5. null
if (null) {
    console.log("This won't run");
} else {
    console.log("null is falsy");
}

// 6. undefined
if (undefined) {
    console.log("This won't run");
} else {
    console.log("undefined is falsy");
}

// 7. NaN (Not a Number)
if (NaN) {
    console.log("This won't run");
} else {
    console.log("NaN is falsy");
}

// 8. 0n (BigInt zero)
if (0n) {
    console.log("This won't run");
} else {
    console.log("0n is falsy");
}

// ========== TRUTHY VALUES ==========
// Everything else is truthy

console.log("\n=== TRUTHY VALUES ===");

// 1. Non-zero numbers
if (1) {
    console.log("1 is truthy");
}
if (-1) {
    console.log("-1 is truthy");
}
if (3.14) {
    console.log("3.14 is truthy");
}

// 2. Non-empty strings
if ("hello") {
    console.log('"hello" is truthy');
}
if (" ") {
    console.log('" " (space) is truthy');
}
if ("0") {
    console.log('"0" is truthy');
}
if ("false") {
    console.log('"false" is truthy');
}

// 3. Arrays (even empty)
if ([]) {
    console.log("[] (empty array) is truthy");
}
if ([1, 2, 3]) {
    console.log("[1,2,3] is truthy");
}

// 4. Objects (even empty)
if ({}) {
    console.log("{} (empty object) is truthy");
}
if ({ name: "John" }) {
    console.log("{ name: 'John' } is truthy");
}

// 5. Functions
if (function() {}) {
    console.log("function() {} is truthy");
}

// 6. Dates
if (new Date()) {
    console.log("new Date() is truthy");
}

// ========== PRACTICAL EXAMPLES ==========

console.log("\n=== PRACTICAL EXAMPLES ===");

// 1. Checking if variable has a value
let userName = "John";
if (userName) {
    console.log(`Hello, ${userName}!`);
} else {
    console.log("No name provided");
}

// 2. Default values using OR operator
let userInput = "";
let defaultName = userInput || "Guest";
console.log(defaultName); // "Guest"

// 3. Short-circuit evaluation
let data = null;
let result = data && data.value;
console.log(result); // null (short-circuits)

// 4. Default with nullish coalescing (only null/undefined)
let value = null;
let fallback = value ?? "Default";
console.log(fallback); // "Default"

let emptyStr = "";
let result2 = emptyStr ?? "Default";
console.log(result2); // "" (empty string is not nullish)

// ========== TESTING TRUTHY/FALSY ==========

console.log("\n=== TESTING VALUES ===");

function testValue(value) {
    if (value) {
        console.log(`${String(value)} is TRUTHY`);
    } else {
        console.log(`${String(value)} is FALSY`);
    }
}

testValue(false);
testValue(0);
testValue("");
testValue(null);
testValue(undefined);
testValue(NaN);
testValue(1);
testValue("hello");
testValue([]);
testValue({});

// ========== COMMON PITFALLS ==========

console.log("\n=== COMMON PITFALLS ===");

// 1. Empty array is truthy, but array.length is 0 (falsy)
let emptyArray = [];
if (emptyArray) {
    console.log("Empty array is truthy");
}
if (emptyArray.length) {
    console.log("This won't run");
} else {
    console.log("Array length 0 is falsy");
}

// 2. Empty object is truthy
let emptyObject = {};
if (emptyObject) {
    console.log("Empty object is truthy");
}

// 3. String "0" is truthy, number 0 is falsy
if ("0") {
    console.log('"0" is truthy');
}
if (0) {
    console.log("This won't run");
} else {
    console.log("0 is falsy");
}

// 4. NaN is falsy
if (NaN) {
    console.log("This won't run");
} else {
    console.log("NaN is falsy");
}
console.log(NaN == NaN); // false (NaN is not equal to itself)

// 5. null and undefined comparison
console.log(null == undefined); // true (loose equality)
console.log(null === undefined); // false (strict equality)

// ========== USEFUL PATTERNS ==========

console.log("\n=== USEFUL PATTERNS ===");

// 1. Optional function parameter default
function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Guest!
greet("John"); // Hello, John!

// 2. Function that accepts either value or null
function processData(data) {
    if (!data) {
        console.log("No data provided");
        return;
    }
    console.log("Processing:", data);
}
processData(null);
processData("Some data");

// 3. Safe property access with && (old way)
let user = { name: "John", address: { city: "NYC" } };
let city = user && user.address && user.address.city;
console.log(city); // "NYC"

// 4. Safe property access with ?. (optional chaining - modern)
let cityModern = user?.address?.city;
console.log(cityModern); // "NYC"

// 5. Setting default value
let userInfo = null;
let displayName = userInfo?.name ?? "Anonymous";
console.log(displayName); // "Anonymous"