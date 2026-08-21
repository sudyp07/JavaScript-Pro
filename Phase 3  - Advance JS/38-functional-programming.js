// 38-functional-programming.js - Functional Programming

// ========== PURE FUNCTIONS ==========
console.log("=== PURE FUNCTIONS ===");

// Impure function - has side effects
let counter = 0;
function impureAdd(value) {
    counter += value;
    return counter;
}
console.log("Impure:", impureAdd(5));
console.log("Impure:", impureAdd(5)); // Different result

// Pure function - no side effects
function pureAdd(a, b) {
    return a + b;
}
console.log("Pure:", pureAdd(5, 3));
console.log("Pure:", pureAdd(5, 3)); // Same result

// Pure function examples
function square(x) {
    return x * x;
}

function double(x) {
    return x * 2;
}

// ========== IMMUTABILITY ==========
console.log("\n=== IMMUTABILITY ===");

// Mutable
const mutable = [1, 2, 3];
mutable.push(4);
console.log("Mutable:", mutable);

// Immutable
function pushImmutable(arr, item) {
    return [...arr, item];
}
const immutable = [1, 2, 3];
const newArray = pushImmutable(immutable, 4);
console.log("Original:", immutable);
console.log("New:", newArray);

// Immutable object updates
const user = { name: "John", age: 25 };
const updatedUser = { ...user, age: 26 };
console.log("Original user:", user);
console.log("Updated user:", updatedUser);

// ========== HIGHER-ORDER FUNCTIONS ==========
console.log("\n=== HIGHER-ORDER FUNCTIONS ===");

// Function that returns a function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double2 = createMultiplier(2);
const triple = createMultiplier(3);
console.log("Double 5:", double2(5));
console.log("Triple 5:", triple(5));

// Function that takes a function
function applyAndLog(fn, value) {
    const result = fn(value);
    console.log(`Applied ${fn.name} to ${value} -> ${result}`);
    return result;
}

const square2 = (x) => x * x;
applyAndLog(square2, 5);

// ========== FUNCTION COMPOSITION ==========
console.log("\n=== FUNCTION COMPOSITION ===");

const add5 = (x) => x + 5;
const multiplyBy3 = (x) => x * 3;
const subtract2 = (x) => x - 2;

// Manual composition
function compose(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

const composed = compose(add5, multiplyBy3, subtract2);
console.log("Composed result:", composed(10)); // (10 - 2) * 3 + 5 = 29

// Pipe (left to right)
function pipe(...fns) {
    return function(x) {
        return fns.reduce((acc, fn) => fn(acc), x);
    };
}

const piped = pipe(subtract2, multiplyBy3, add5);
console.log("Piped result:", piped(10)); // (10 - 2) * 3 + 5 = 29

// ========== CURRYING ==========
console.log("\n=== CURRYING ===");

// Manual currying
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log("Curried:", curriedAdd(1)(2)(3));

// Auto-currying function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...more) {
            return curried(...args, ...more);
        };
    };
}

const add3 = curry((a, b, c) => a + b + c);
console.log("Auto-curried:", add3(1)(2)(3));
console.log("Auto-curried partial:", add3(1, 2)(3));

// ========== PARTIAL APPLICATION ==========
console.log("\n=== PARTIAL APPLICATION ===");

function partial(fn, ...args) {
    return function(...remaining) {
        return fn(...args, ...remaining);
    };
}

const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
console.log("Partial:", multiplyBy2(3, 4)); // 2 * 3 * 4 = 24

// ========== MEMOIZATION ==========
console.log("\n=== MEMOIZATION ===");

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] === undefined) {
            console.log(`Computing for ${args}`);
            cache[key] = fn(...args);
        } else {
            console.log(`Cache hit for ${args}`);
        }
        return cache[key];
    };
}

function expensiveOperation(n) {
    console.log("Expensive calculation...");
    return n * n * n;
}

const memoized = memoize(expensiveOperation);
console.log("Result:", memoized(5));
console.log("Result:", memoized(5));
console.log("Result:", memoized(10));

// ========== RECURSION ==========
console.log("\n=== RECURSION ===");

// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log("Factorial 5:", factorial(5));

// Fibonacci (with memoization)
function fibonacciMemo() {
    const cache = {};
    return function fib(n) {
        if (n <= 1) return n;
        if (cache[n] !== undefined) return cache[n];
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    };
}
const fib = fibonacciMemo();
console.log("Fibonacci 10:", fib(10));

// ========== FUNCTIONAL DATA MANIPULATION ==========
console.log("\n=== FUNCTIONAL DATA MANIPULATION ===");

const data = [
    { id: 1, name: "John", age: 25, salary: 50000 },
    { id: 2, name: "Jane", age: 30, salary: 60000 },
    { id: 3, name: "Bob", age: 35, salary: 70000 },
    { id: 4, name: "Alice", age: 28, salary: 55000 }
];

// Map, filter, reduce
const result = data
    .filter(person => person.age >= 30)
    .map(person => ({ ...person, salary: person.salary * 1.1 }))
    .reduce((acc, person) => acc + person.salary, 0);

console.log("Total salary after increase:", result);

// ========== MONADS (Option/Either) ==========
console.log("\n=== MONADS (Option/Either) ===");

class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        return new Maybe(value);
    }
    
    map(fn) {
        if (this.value === null || this.value === undefined) {
            return Maybe.of(null);
        }
        return Maybe.of(fn(this.value));
    }
    
    getOrElse(defaultValue) {
        return this.value === null || this.value === undefined
            ? defaultValue
            : this.value;
    }
}

const maybeResult = Maybe.of(5)
    .map(x => x * 2)
    .map(x => x + 3)
    .getOrElse(0);

console.log("Maybe result:", maybeResult);

// ========== IMMUTABLE DATA STRUCTURES ==========
console.log("\n=== IMMUTABLE DATA STRUCTURES ===");

// Using Object.freeze
const immutableData = Object.freeze({ name: "John", age: 25 });
// immutableData.age = 26; // Error in strict mode

// Immutable update function
function updatePerson(person, updates) {
    return Object.freeze({ ...person, ...updates });
}

const newPerson = updatePerson(immutableData, { age: 26 });
console.log("Original:", immutableData);
console.log("Updated:", newPerson);

// ========== FUNCTIONAL PROGRAMMING BEST PRACTICES ==========
console.log("\n=== FUNCTIONAL PROGRAMMING BEST PRACTICES ===");

console.log("1. Use pure functions - no side effects");
console.log("2. Keep data immutable");
console.log("3. Use higher-order functions");
console.log("4. Compose functions for complex operations");
console.log("5. Use currying for partial application");
console.log("6. Memoize expensive operations");
console.log("7. Use recursion for iterative processes");
console.log("8. Prefer declarative over imperative code");
console.log("9. Use Maybe/Either for null handling");
console.log("10. Keep functions small and focused");