// 14-functions.js - Functions in JavaScript

// Basic function declaration
function greet() {
    console.log("Hello, World!");
}
greet(); // Call the function

// Function with parameters
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}
sayHello("John");

// Function with return value
function add(a, b) {
    return a + b;
}
let result = add(5, 3);
console.log(result); // 8

// Function with default parameters
function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(5)); // 10
console.log(multiply(5, 3)); // 15

// Function expression (stored in variable)
let square = function(x) {
    return x * x;
};
console.log(square(5)); // 25

// Arrow function (ES6)
let cube = (x) => {
    return x * x * x;
};
console.log(cube(3)); // 27

// Arrow function with single parameter (shorthand)
let double = x => x * 2;
console.log(double(5)); // 10

// Arrow function with multiple parameters
let sum = (a, b) => a + b;
console.log(sum(10, 20)); // 30

// Function with multiple return statements
function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Minor";
    }
}
console.log(checkAge(20)); // Adult
console.log(checkAge(15)); // Minor

// Function with no return (returns undefined)
function sayGoodbye(name) {
    console.log(`Goodbye, ${name}!`);
}
let goodbye = sayGoodbye("John");
console.log(goodbye); // undefined

// Function with rest parameters (...)
function sumAll(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Function with default values and rest
function introduce(name, age = 25, ...hobbies) {
    console.log(`Name: ${name}, Age: ${age}`);
    console.log(`Hobbies: ${hobbies.join(", ")}`);
}
introduce("John", 30, "reading", "gaming", "travel");

// Function as parameter (callback)
function processUser(name, callback) {
    let message = callback(name);
    console.log(message);
}
processUser("Alice", function(name) {
    return `Welcome, ${name}!`;
});
// With arrow function
processUser("Bob", name => `Hello, ${name}!`);

// Function returning function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
let double2 = createMultiplier(2);
console.log(double2(5)); // 10
let triple = createMultiplier(3);
console.log(triple(5)); // 15

// Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("This runs immediately");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("John");

// Function with object parameter
function printPerson(person) {
    console.log(`Name: ${person.name}`);
    console.log(`Age: ${person.age}`);
}
let user = { name: "Jane", age: 28 };
printPerson(user);

// Function with destructuring
function displayUser({ name, age, city = "Unknown" }) {
    console.log(`${name} is ${age} years old from ${city}`);
}
displayUser({ name: "Mike", age: 32, city: "NYC" });
displayUser({ name: "Sarah", age: 27 });

// Function scope
let globalVar = "Global";
function scopeTest() {
    let localVar = "Local";
    console.log(globalVar); // Accessible
    console.log(localVar); // Accessible
}
scopeTest();
// console.log(localVar); // Error - not defined outside

// Function hoisting (works with function declarations)
sayHi(); // Works even though called before declaration
function sayHi() {
    console.log("Hi there!");
}
// Arrow functions are NOT hoisted
// hello(); // Error
let hello = () => console.log("Hello");