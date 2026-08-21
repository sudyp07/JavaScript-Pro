// 35-generators.js - Generators and Iterators

// ========== BASIC GENERATOR ==========
console.log("=== BASIC GENERATOR ===");

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
console.log(gen.next()); // { value: 5, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// ========== ITERATING OVER GENERATORS ==========
console.log("\n=== ITERATING OVER GENERATORS ===");

function* colors() {
    yield "red";
    yield "green";
    yield "blue";
}

// Using for...of
for (const color of colors()) {
    console.log(color);
}

// Using spread operator
const colorArray = [...colors()];
console.log(colorArray);

// Using destructuring
const [firstColor, secondColor] = colors();
console.log(firstColor, secondColor);

// ========== INFINITE GENERATORS ==========
console.log("\n=== INFINITE GENERATORS ===");

function* infiniteSequence() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

const infinite = infiniteSequence();
console.log(infinite.next().value); // 1
console.log(infinite.next().value); // 2
console.log(infinite.next().value); // 3
console.log(infinite.next().value); // 4

// ========== GENERATOR WITH PARAMETERS ==========
console.log("\n=== GENERATOR WITH PARAMETERS ===");

function* fibonacci(limit = 10) {
    let a = 0;
    let b = 1;
    let count = 0;
    
    while (count < limit) {
        yield a;
        [a, b] = [b, a + b];
        count++;
    }
}

for (const num of fibonacci(8)) {
    console.log(num);
}

// ========== TWO-WAY COMMUNICATION ==========
console.log("\n=== TWO-WAY COMMUNICATION ===");

function* communication() {
    const received1 = yield "Send first value";
    console.log("Received first:", received1);
    
    const received2 = yield "Send second value";
    console.log("Received second:", received2);
    
    return "Done!";
}

const comm = communication();
console.log(comm.next().value); // "Send first value"
console.log(comm.next("Hello").value); // "Send second value"
console.log(comm.next("World")); // { value: "Done!", done: true }

// ========== GENERATOR DELEGATION ==========
console.log("\n=== GENERATOR DELEGATION ===");

function* generatorA() {
    yield 1;
    yield 2;
    yield 3;
}

function* generatorB() {
    yield "a";
    yield* generatorA();
    yield "b";
    yield "c";
}

for (const value of generatorB()) {
    console.log(value);
}

// ========== GENERATOR YIELD* WITH ARRAYS ==========
console.log("\n=== GENERATOR YIELD* WITH ARRAYS ===");

function* yieldFromArray() {
    yield* [1, 2, 3, 4, 5];
}

for (const num of yieldFromArray()) {
    console.log(num);
}

// ========== GENERATOR RETURN AND THROW ==========
console.log("\n=== GENERATOR RETURN AND THROW ===");

function* generatorWithControl() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (error) {
        console.log("Error caught:", error.message);
    }
    yield 4;
    yield 5;
}

const control = generatorWithControl();
console.log(control.next().value); // 1
console.log(control.return("Early return").value); // Early return
console.log(control.next()); // { value: undefined, done: true }

// Using throw
function* generatorWithThrow() {
    try {
        yield 1;
        yield 2;
    } catch (error) {
        console.log("Caught:", error.message);
        yield 3;
    }
    yield 4;
}

const g = generatorWithThrow();
console.log(g.next().value); // 1
console.log(g.throw(new Error("Something went wrong")).value); // 3
console.log(g.next().value); // 4

// ========== CUSTOM ITERATOR ==========
console.log("\n=== CUSTOM ITERATOR ===");

class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}

const range = new Range(1, 5);
for (const num of range) {
    console.log(num);
}

// ========== GENERATOR AS ITERATOR ==========
console.log("\n=== GENERATOR AS ITERATOR ===");

class RangeWithGenerator {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    *[Symbol.iterator]() {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
}

const range2 = new RangeWithGenerator(1, 5);
for (const num of range2) {
    console.log(num);
}

// ========== ASYNC GENERATORS ==========
console.log("\n=== ASYNC GENERATORS ===");

async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

async function consumeAsyncGenerator() {
    for await (const value of asyncGenerator()) {
        console.log("Async value:", value);
    }
}

consumeAsyncGenerator();

// ========== GENERATOR USE CASES ==========
console.log("\n=== GENERATOR USE CASES ===");

// 1. Lazy evaluation
function* lazySequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const lazy = lazySequence();
console.log("Lazy first 5 values:");
for (let i = 0; i < 5; i++) {
    console.log(lazy.next().value);
}

// 2. Pagination
function* paginate(data, pageSize) {
    for (let i = 0; i < data.length; i += pageSize) {
        yield data.slice(i, i + pageSize);
    }
}

const data = Array.from({ length: 25 }, (_, i) => i + 1);
const pages = paginate(data, 5);
console.log("Page 1:", pages.next().value);
console.log("Page 2:", pages.next().value);

// 3. State machine
function* stateMachine() {
    let state = "idle";
    
    while (true) {
        const action = yield state;
        
        switch (action) {
            case "start":
                state = "running";
                break;
            case "pause":
                state = "paused";
                break;
            case "stop":
                state = "stopped";
                return state;
            default:
                state = "idle";
        }
    }
}

const machine = stateMachine();
console.log("State:", machine.next().value);
console.log("State:", machine.next("start").value);
console.log("State:", machine.next("pause").value);
console.log("State:", machine.next("stop").value);

// 4. Data pipeline
function* pipeline(data) {
    for (const item of data) {
        const processed = yield item * 2;
        console.log("Processed:", processed);
    }
}

const pipe = pipeline([1, 2, 3, 4, 5]);
for (const item of pipe) {
    console.log("Original:", item);
    pipe.next(item * 3);
}

// ========== GENERATOR VS REGULAR FUNCTION ==========
console.log("\n=== GENERATOR VS REGULAR FUNCTION ===");

// Regular function - executes completely
function regularFunction() {
    console.log("Starting");
    console.log("Middle");
    console.log("End");
    return "Done";
}
console.log(regularFunction());

// Generator - can pause and resume
function* generatorFunction() {
    console.log("Starting");
    yield "Paused at first yield";
    console.log("Middle");
    yield "Paused at second yield";
    console.log("End");
    return "Done";
}

const genFunc = generatorFunction();
console.log(genFunc.next().value);
console.log("Do something else...");
console.log(genFunc.next().value);
console.log("Do something else...");
console.log(genFunc.next().value);