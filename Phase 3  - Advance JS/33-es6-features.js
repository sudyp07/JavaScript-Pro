// 33-es6-features.js - ES6+ Features

// ========== LET AND CONST ==========
console.log("=== LET AND CONST ===");

// let - block scoped, can be reassigned
let name = "John";
name = "Jane"; // Valid
console.log(name);

// const - block scoped, cannot be reassigned
const age = 30;
// age = 31; // Error - cannot reassign
console.log(age);

// Block scope
{
    let blockScoped = "I'm in a block";
    const blockConst = "Also in block";
    var functionScoped = "I'm function scoped";
}
// console.log(blockScoped); // Error
// console.log(blockConst); // Error
console.log(functionScoped); // Works

// ========== DESTRUCTURING ==========
console.log("\n=== DESTRUCTURING ===");

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first, second, third);

// Skipping elements
const [, , thirdColor] = colors;
console.log(thirdColor);

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head, tail);

// Object destructuring
const person = {
    name: "Alice",
    age: 25,
    city: "NYC",
    country: "USA"
};
const { name: personName, age: personAge, city } = person;
console.log(personName, personAge, city);

// Default values
const { phone = "N/A" } = person;
console.log(phone);

// Nested destructuring
const user = {
    id: 1,
    profile: {
        username: "alice123",
        email: "alice@example.com"
    }
};
const { profile: { username, email } } = user;
console.log(username, email);

// ========== REST AND SPREAD ==========
console.log("\n=== REST AND SPREAD ===");

// Spread operator - arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);

// Spread operator - objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged);

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// Rest in destructuring
const [firstNum, ...restNums] = [10, 20, 30, 40];
console.log(firstNum, restNums);

// ========== TEMPLATE LITERALS ==========
console.log("\n=== TEMPLATE LITERALS ===");

const name2 = "John";
const age2 = 30;

// String interpolation
const greeting = `Hello, ${name2}! You are ${age2} years old.`;
console.log(greeting);

// Multi-line strings
const multiLine = `
    This is a
    multi-line
    string
`;
console.log(multiLine);

// Expressions
const price = 10;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
console.log(total);

// Tagged templates
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i]?.toUpperCase() || '');
    }, '');
}
const tagged = tag`Hello ${name2}, you are ${age2} years old`;
console.log(tagged);

// ========== DEFAULT PARAMETERS ==========
console.log("\n=== DEFAULT PARAMETERS ===");

function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}
console.log(greet());
console.log(greet("John"));
console.log(greet("Jane", "Hi"));

// Default with destructuring
function createUser({ name = "Anonymous", age = 0, city = "Unknown" } = {}) {
    return { name, age, city };
}
console.log(createUser());
console.log(createUser({ name: "John", age: 25 }));

// ========== ENHANCED OBJECT LITERALS ==========
console.log("\n=== ENHANCED OBJECT LITERALS ===");

// Property shorthand
const firstName = "John";
const lastName = "Doe";
const userObj = {
    firstName,
    lastName,
    // Method shorthand
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    // Computed property names
    [`user_${Date.now()}`]: "active"
};
console.log(userObj);
console.log(userObj.getFullName());

// ========== OPTIONAL CHAINING ==========
console.log("\n=== OPTIONAL CHAINING ===");

const userData = {
    name: "John",
    address: {
        city: "NYC",
        zip: "10001"
    }
};

// Without optional chaining
const cityName = userData && userData.address && userData.address.city;
console.log(cityName);

// With optional chaining
const cityName2 = userData?.address?.city;
console.log(cityName2);

const phoneNumber = userData?.contact?.phone;
console.log(phoneNumber); // undefined

// Optional chaining with function calls
const result = userData?.getFullName?.();
console.log(result); // undefined

// ========== NULLISH COALESCING ==========
console.log("\n=== NULLISH COALESCING ===");

// Only checks for null or undefined
const input1 = null;
const defaultValue = input1 ?? "Default";
console.log(defaultValue);

const input2 = 0;
const value2 = input2 ?? 10;
console.log(value2); // 0 (not null/undefined)

const input3 = "";
const value3 = input3 ?? "Not empty";
console.log(value3); // "" (not null/undefined)

// ========== BIGINT ==========
console.log("\n=== BIGINT ===");

const bigNum1 = 9007199254740991n;
const bigNum2 = BigInt(9007199254740991);

console.log(bigNum1);
console.log(bigNum2);
console.log(bigNum1 + 1n);
console.log(bigNum1 * 2n);

// ========== SYMBOL ==========
console.log("\n=== SYMBOL ===");

const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false

const sym3 = Symbol.for("shared");
const sym4 = Symbol.for("shared");
console.log(sym3 === sym4); // true

// Using as property keys
const uniqueKey = Symbol("unique");
const obj = {
    [uniqueKey]: "Secret value",
    normalKey: "Normal value"
};
console.log(obj[uniqueKey]);
console.log(Object.keys(obj)); // Only normalKey

// ========== FOR...OF LOOP ==========
console.log("\n=== FOR...OF LOOP ===");

// Arrays
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}

// Strings
for (const char of "hello") {
    console.log(char);
}

// Sets
const set = new Set([1, 2, 3, 3, 4]);
for (const num of set) {
    console.log(num);
}

// Maps
const map = new Map([
    ["name", "John"],
    ["age", 30]
]);
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}

// ========== OBJECT ENTRIES/VALUES/KEYS ==========
console.log("\n=== OBJECT ENTRIES/VALUES/KEYS ===");

const personObj = {
    name: "Alice",
    age: 25,
    city: "NYC"
};

// Keys
console.log("Keys:", Object.keys(personObj));

// Values
console.log("Values:", Object.values(personObj));

// Entries
console.log("Entries:", Object.entries(personObj));

// Iterating over entries
for (const [key, value] of Object.entries(personObj)) {
    console.log(`${key}: ${value}`);
}

// ========== PROMISE FINALLY ==========
console.log("\n=== PROMISE FINALLY ===");

Promise.resolve("Success")
    .then(result => {
        console.log("Result:", result);
        return result;
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Finally - always executed");
    });

// ========== SUMMARY OF ES6+ FEATURES ==========
console.log("\n=== SUMMARY OF ES6+ FEATURES ===");

console.log("1. let and const - block scoped variables");
console.log("2. Destructuring - arrays and objects");
console.log("3. Spread/Rest operators - ...");
console.log("4. Template literals - `...${...}...`");
console.log("5. Default parameters - function(a = 1)");
console.log("6. Enhanced object literals - { name, method() {} }");
console.log("7. Optional chaining - obj?.prop");
console.log("8. Nullish coalescing - a ?? b");
console.log("9. BigInt - 12345678901234567890n");
console.log("10. Symbol - unique and immutable");
console.log("11. For...of loop - for (const item of iterable)");
console.log("12. Object methods - keys, values, entries");
console.log("13. Promise.finally - always executes");
console.log("14. Async/Await - cleaner promises");
console.log("15. Modules - import/export");
console.log("16. Classes - class, extends, super");
console.log("17. Map/Set - new data structures");
console.log("18. WeakMap/WeakSet - weak references");
console.log("19. Proxy/Reflect - metaprogramming");
console.log("20. Generators - function* and yield");