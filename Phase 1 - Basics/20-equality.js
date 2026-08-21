// 20-equality.js - Equality comparisons in JavaScript

// ========== TYPES OF EQUALITY ==========

// 1. Loose equality (==) - compares values after type coercion
// 2. Strict equality (===) - compares values and types
// 3. Object.is() - similar to === but handles special cases differently

console.log("=== LOOSE EQUALITY (==) ===");
// Loose equality performs type coercion

console.log(5 == 5); // true
console.log(5 == "5"); // true (string converted to number)
console.log(5 == "5.0"); // true
console.log(0 == false); // true (boolean converted to number)
console.log(0 == ""); // true (string converted to number)
console.log("" == false); // true
console.log(null == undefined); // true
console.log([] == false); // true (array converted to string then number)
console.log([1] == 1); // true
console.log([1,2] == "1,2"); // true

console.log("\n=== STRICT EQUALITY (===) ===");
// Strict equality checks value AND type

console.log(5 === 5); // true
console.log(5 === "5"); // false (different types)
console.log(5 === "5.0"); // false
console.log(0 === false); // false (number vs boolean)
console.log(0 === ""); // false
console.log(null === undefined); // false
// console.log([] === false); // false
// console.log([] === []); // false (different array objects)

console.log("\n=== OBJECT IS ===");
// Object.is - similar to === but with special cases

console.log(Object.is(5, 5)); // true
console.log(Object.is(5, "5")); // false
console.log(Object.is(0, -0)); // false (=== would be true)
console.log(Object.is(NaN, NaN)); // true (=== would be false)
console.log(Object.is(null, null)); // true
console.log(Object.is(undefined, undefined)); // true

console.log("\n=== COMPARISON TABLE ===");

function compareValues(a, b) {
    console.log(`${String(a)} == ${String(b)}:`, a == b);
    console.log(`${String(a)} === ${String(b)}:`, a === b);
    console.log(`Object.is(${String(a)}, ${String(b)}):`, Object.is(a, b));
    console.log("---");
}

compareValues(5, "5");
compareValues(0, false);
compareValues("", false);
compareValues(null, undefined);
compareValues(NaN, NaN);
compareValues(0, -0);
compareValues([], []);
compareValues({}, {});

// ========== COMPARING OBJECTS ==========

console.log("\n=== COMPARING OBJECTS ===");

let obj1 = { name: "John" };
let obj2 = { name: "John" };
let obj3 = obj1;

console.log(obj1 == obj2); // false (different objects)
console.log(obj1 === obj2); // false (different objects)
console.log(obj1 == obj3); // true (same reference)
console.log(obj1 === obj3); // true (same reference)

console.log("\n=== COMPARING ARRAYS ===");

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
let arr3 = arr1;

console.log(arr1 == arr2); // false
console.log(arr1 === arr2); // false
console.log(arr1 == arr3); // true
console.log(arr1 === arr3); // true

// ========== DEEP EQUALITY (custom) ==========

console.log("\n=== DEEP EQUALITY EXAMPLES ===");

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}

let person1 = { name: "John", age: 25, hobbies: ["reading", "gaming"] };
let person2 = { name: "John", age: 25, hobbies: ["reading", "gaming"] };
let person3 = { name: "John", age: 30, hobbies: ["reading", "gaming"] };

console.log(deepEqual(person1, person2)); // true
console.log(deepEqual(person1, person3)); // false

// ========== COMMON PITFALLS ==========

console.log("\n=== COMMON PITFALLS ===");

// 1. NaN is not equal to anything (including itself)
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// 2. Null and undefined
console.log(null == undefined); // true
console.log(null === undefined); // false

// 3. Empty arrays and strings
console.log([] == ""); // true
// console.log([] === ""); // false

// 4. Objects with same content but different references
console.log({} == {}); // false
// console.log({} === {}); // false

// 5. Type coercion surprises
console.log([] + []); // "" (both become strings)
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]"
console.log([] == ![]); // true (coercion)

// ========== BEST PRACTICES ==========

console.log("\n=== BEST PRACTICES ===");

// 1. Use === instead of == (unless you know what you're doing)
let num = 5;
let str = "5";
if (num === str) {
    console.log("This is safer");
} else {
    console.log("Types don't match");
}

// 2. Check for null or undefined explicitly
function processValue(value) {
    if (value === null || value === undefined) {
        console.log("Value is null or undefined");
    } else {
        console.log("Value is:", value);
    }
}
processValue(null);
processValue(undefined);
processValue(5);

// 3. Use Object.is() for special cases
if (Object.is(NaN, NaN)) {
    console.log("Object.is works with NaN");
}

// 4. For checking existence (not null/undefined)
function checkExistence(value) {
    if (value !== null && value !== undefined) {
        console.log("Value exists:", value);
    } else {
        console.log("Value is null or undefined");
    }
}
checkExistence(0); // Exists
checkExistence(""); // Exists
checkExistence(null); // Doesn't exist

// 5. For checking truthy/falsy values (with caution)
function checkTruthy(value) {
    if (value) {
        console.log("Value is truthy");
    } else {
        console.log("Value is falsy");
    }
}
checkTruthy(0); // falsy
checkTruthy("0"); // truthy
checkTruthy(""); // falsy
checkTruthy(" "); // truthy

console.log("\n=== SUMMARY ===");
console.log("Use === for most comparisons");
console.log("Use == only when you explicitly want type coercion");
console.log("Use Object.is() for NaN and +/-0 comparisons");
console.log("Be careful with object/array comparisons (they compare references)");