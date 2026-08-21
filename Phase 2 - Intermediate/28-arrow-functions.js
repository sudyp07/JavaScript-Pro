// 28-arrow-functions.js - Arrow functions in JavaScript

// ========== BASIC SYNTAX ==========
console.log("=== BASIC SYNTAX ===");

// Traditional function
function add(a, b) {
    return a + b;
}
console.log("Traditional:", add(5, 3));

// Arrow function - explicit return
const addArrow = (a, b) => {
    return a + b;
};
console.log("Arrow (explicit):", addArrow(5, 3));

// Arrow function - implicit return (single expression)
const addImplicit = (a, b) => a + b;
console.log("Arrow (implicit):", addImplicit(5, 3));

// Single parameter - parentheses optional
const square = x => x * x;
console.log("Square:", square(5));

// No parameters - need parentheses
const greet = () => "Hello!";
console.log("Greet:", greet());

// ========== RETURNING OBJECTS ==========
console.log("\n=== RETURNING OBJECTS ===");

// Returning object requires parentheses
const createPerson = (name, age) => ({ name, age });
console.log("Person:", createPerson("John", 30));

// Without parentheses - this would be interpreted as a block
// const createPersonWrong = (name, age) => { name, age }; // Error

// ========== THIS BINDING ==========
console.log("\n=== THIS BINDING ===");

// Traditional function - this depends on how it's called
const traditionalObj = {
    name: "John",
    greet: function() {
        console.log("Traditional:", this.name);
    }
};
traditionalObj.greet(); // John

const globalGreet = traditionalObj.greet;
// globalGreet(); // undefined or global object

// Arrow function - this is lexical (inherited from parent scope)
const arrowObj = {
    name: "John",
    greet: () => {
        console.log("Arrow:", this.name); // this is not the object
    }
};
arrowObj.greet(); // undefined or global

// Arrow functions in methods - use traditional functions for methods
const objWithMethod = {
    name: "Jane",
    // Traditional function (recommended for methods)
    sayHello() {
        console.log("Hello:", this.name);
    }
};
objWithMethod.sayHello(); // Hello: Jane

// ========== ARROW FUNCTIONS IN CALLBACKS ==========
console.log("\n=== ARROW FUNCTIONS IN CALLBACKS ===");

// Timer callback
setTimeout(() => {
    console.log("Executed after 1 second");
}, 1000);

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Doubled:", doubled);

// Event handlers (in browser)
// document.addEventListener('click', () => {
//     console.log('Clicked!');
// });

// ========== ARROW FUNCTIONS AND THIS ==========
console.log("\n=== ARROW FUNCTIONS AND THIS ===");

class Counter {
    constructor() {
        this.count = 0;
    }

    // Traditional function - this refers to instance
    increment() {
        this.count++;
        console.log("Count:", this.count);
    }

    // Arrow function - this is lexical
    incrementArrow = () => {
        this.count++;
        console.log("Count (arrow):", this.count);
    }
}

const counter = new Counter();

// Traditional method
const inc = counter.increment;
// inc(); // Error - this is undefined or global

// Arrow method (works with callbacks)
const incArrow = counter.incrementArrow;
incArrow(); // Works - this is bound to instance

// ========== ARROW FUNCTIONS IN CLASSES ==========
console.log("\n=== ARROW FUNCTIONS IN CLASSES ===");

class Timer {
    constructor(seconds) {
        this.seconds = seconds;
    }

    // Traditional function - loses this in callback
    startBad() {
        setInterval(function() {
            this.seconds--; // this is global or undefined
            console.log("Bad timer:", this.seconds);
        }, 1000);
    }

    // Arrow function - preserves this
    startGood() {
        setInterval(() => {
            this.seconds--;
            console.log("Good timer:", this.seconds);
        }, 1000);
    }
}

const timer = new Timer(5);
// timer.startBad(); // This would cause issues
// timer.startGood(); // This works

// ========== ARROW FUNCTIONS VS TRADITIONAL ==========
console.log("\n=== ARROW FUNCTIONS VS TRADITIONAL ===");

// 1. No arguments object
function traditionalFunc() {
    console.log("Arguments:", arguments);
}
traditionalFunc(1, 2, 3); // [1, 2, 3]

const arrowFunc = (...args) => {
    console.log("Arguments:", args);
};
arrowFunc(1, 2, 3); // [1, 2, 3]

// 2. Cannot be used as constructors
function Person(name) {
    this.name = name;
}
const p = new Person("John");
console.log("Person:", p);

// const ArrowPerson = (name) => { this.name = name; };
// const ap = new ArrowPerson("John"); // Error

// 3. No prototype property
console.log("Prototype:", Person.prototype);
console.log("Arrow prototype:", arrowFunc.prototype); // undefined

// 4. Cannot be used with yield
// 5. Cannot be used as method if this needs to be bound

// ========== WHEN TO USE ARROW FUNCTIONS ==========
console.log("\n=== WHEN TO USE ARROW FUNCTIONS ===");

// ✅ Use for:
// - Callbacks and event handlers
// - Array methods (map, filter, reduce)
// - Functions that don't need their own this
// - Short, simple functions
// - Functions that don't need arguments object

// ❌ Avoid for:
// - Object methods that need this
// - Constructors
// - Functions that need arguments object
// - Functions that need to be dynamically called
// - Generator functions

// ========== PRACTICAL EXAMPLES ==========
console.log("\n=== PRACTICAL EXAMPLES ===");

// Example 1: Event handling
const button = {
    click: function() {
        console.log("Button clicked!");
        // Works
        setTimeout(() => {
            console.log("Async after click"); // this is button
        }, 1000);
    }
};
button.click();

// Example 2: Data transformation
const data = [
    { name: "Apple", price: 1.5 },
    { name: "Banana", price: 0.75 },
    { name: "Orange", price: 2.0 }
];

const discounted = data.map(item => ({
    ...item,
    price: item.price * 0.9
}));
console.log("Discounted:", discounted);

// Example 3: Promise chains
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log("Data:", data);
        return data.map(item => ({ id: item.id, name: item.name }));
    })
    .then(processed => console.log("Processed:", processed))
    .catch(error => console.log("Error:", error));

// ========== PERFORMANCE CONSIDERATIONS ==========
console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

// Arrow functions can be slightly slower than traditional functions
// In modern engines, the difference is negligible

// For critical performance code, use traditional functions
// For most cases, arrow functions are fine

// ========== SUMMARY ==========
console.log("\n=== SUMMARY ===");

console.log("1. Arrow functions provide a concise syntax");
console.log("2. They have lexical this binding (inherited from parent scope)");
console.log("3. Cannot be used as constructors");
console.log("4. Don't have the arguments object");
console.log("5. Best used for callbacks and array methods");
console.log("6. Avoid using as object methods");
console.log("7. Use traditional functions for methods and constructors");
console.log("8. Arrow functions cannot be used as generators");
console.log("9. They don't have a prototype property");
console.log("10. Use with caution in performance-critical code");