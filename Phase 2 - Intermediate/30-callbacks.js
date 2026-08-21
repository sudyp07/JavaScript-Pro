// 30-callbacks.js - Callback functions and patterns

// ========== BASIC CALLBACKS ==========
console.log("=== BASIC CALLBACKS ===");

// Simple callback
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

greet("John", () => {
    console.log("Callback executed!");
});

// Callback with parameters
function processData(data, callback) {
    const result = data * 2;
    callback(result);
}

processData(5, (result) => {
    console.log("Result:", result);
});

// ========== ASYNCHRONOUS CALLBACKS ==========
console.log("\n=== ASYNCHRONOUS CALLBACKS ===");

// setTimeout
setTimeout(() => {
    console.log("Executed after 1 second");
}, 1000);

console.log("This executes first");

// setInterval
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Interval ${count}`);
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Interval stopped");
    }
}, 1000);

// ========== ERROR-FIRST CALLBACKS ==========
console.log("\n=== ERROR-FIRST CALLBACKS ===");

// Node.js style error-first callbacks
function readFile(filename, callback) {
    // Simulate file read
    setTimeout(() => {
        if (filename === "valid.txt") {
            callback(null, "File content");
        } else {
            callback(new Error("File not found"), null);
        }
    }, 1000);
}

readFile("valid.txt", (error, data) => {
    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Data:", data);
    }
});

readFile("invalid.txt", (error, data) => {
    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Data:", data);
    }
});

// ========== CALLBACK HELL ==========
console.log("\n=== CALLBACK HELL ===");

// Example of callback hell (pyramid of doom)
function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 complete");
        callback();
    }, 500);
}

function step2(callback) {
    setTimeout(() => {
        console.log("Step 2 complete");
        callback();
    }, 500);
}

function step3(callback) {
    setTimeout(() => {
        console.log("Step 3 complete");
        callback();
    }, 500);
}

// Nested callbacks (callback hell)
step1(() => {
    step2(() => {
        step3(() => {
            console.log("All steps complete!");
        });
    });
});

// ========== SOLVING CALLBACK HELL ==========
console.log("\n=== SOLVING CALLBACK HELL ===");

// Using named functions
function onStep1Complete() {
    console.log("Step 1 complete");
    step2(onStep2Complete);
}

function onStep2Complete() {
    console.log("Step 2 complete");
    step3(onStep3Complete);
}

function onStep3Complete() {
    console.log("Step 3 complete");
    console.log("All steps complete!");
}

// step1(onStep1Complete); // Uncomment to run

// Using promises (covered in next file)
function step1Promise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 1 complete");
            resolve();
        }, 500);
    });
}

function step2Promise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 2 complete");
            resolve();
        }, 500);
    });
}

function step3Promise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 3 complete");
            resolve();
        }, 500);
    });
}

// Chaining promises
step1Promise()
    .then(step2Promise)
    .then(step3Promise)
    .then(() => console.log("All steps complete!"));

// ========== CALLBACKS WITH ARRAY METHODS ==========
console.log("\n=== CALLBACKS WITH ARRAY METHODS ===");

const numbers3 = [1, 2, 3, 4, 5];

// forEach
numbers3.forEach((num) => {
    console.log("Number:", num);
});

// map
const doubled3 = numbers3.map((num) => num * 2);
console.log("Doubled:", doubled3);

// filter
const evens3 = numbers3.filter((num) => num % 2 === 0);
console.log("Evens:", evens3);

// sort
const sorted3 = numbers3.sort((a, b) => a - b);
console.log("Sorted:", sorted3);

// reduce
const sum3 = numbers3.reduce((acc, num) => acc + num, 0);
console.log("Sum:", sum3);

// ========== EVENT HANDLING WITH CALLBACKS ==========
console.log("\n=== EVENT HANDLING WITH CALLBACKS ===");

// Simulating event emitter
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Using event emitter
const emitter = new EventEmitter();

emitter.on("userLogin", (user) => {
    console.log(`User ${user.name} logged in`);
});

emitter.on("userLogin", (user) => {
    console.log(`Welcome, ${user.name}!`);
});

emitter.emit("userLogin", { name: "John" });

// ========== CALLBACKS IN NODE.JS ==========
console.log("\n=== CALLBACKS IN NODE.JS ===");

// Simulating fs.readFile
function readFileAsync(path, callback) {
    setTimeout(() => {
        if (path === "file.txt") {
            callback(null, "File content");
        } else {
            callback(new Error("File not found"), null);
        }
    }, 500);
}

readFileAsync("file.txt", (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
    } else {
        console.log("File data:", data);
    }
});

// ========== CALLBACK WITH CONTEXT ==========
console.log("\n=== CALLBACK WITH CONTEXT ===");

class UserService {
    constructor() {
        this.users = [];
    }

    addUser(user, callback) {
        this.users.push(user);
        callback(null, user);
    }

    getUser(id, callback) {
        const user = this.users.find(u => u.id === id);
        if (user) {
            callback(null, user);
        } else {
            callback(new Error("User not found"), null);
        }
    }
}

const userService = new UserService();

userService.addUser({ id: 1, name: "John" }, (err, user) => {
    if (err) {
        console.error("Error adding user:", err.message);
    } else {
        console.log("User added:", user);
        userService.getUser(1, (err, foundUser) => {
            if (err) {
                console.error("Error getting user:", err.message);
            } else {
                console.log("User found:", foundUser);
            }
        });
    }
});

// ========== BETTER CALLBACK PATTERNS ==========
console.log("\n=== BETTER CALLBACK PATTERNS ===");

// Using async/await (covered in next file)
async function processUserAsync() {
    try {
        const user = await getUserAsync(1);
        console.log("User:", user);
        const posts = await getPostsAsync(user.id);
        console.log("Posts:", posts);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Simulated async functions
function getUserAsync(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, name: "John" });
            } else {
                reject(new Error("User not found"));
            }
        }, 500);
    });
}

function getPostsAsync(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 500);
    });
}

processUserAsync();

// ========== CALLBACK PERFORMANCE ==========
console.log("\n=== CALLBACK PERFORMANCE ===");

// Measuring callback execution time
function measureExecution(fn) {
    const start = Date.now();
    fn(() => {
        const end = Date.now();
        console.log(`Execution time: ${end - start}ms`);
    });
}

measureExecution((callback) => {
    setTimeout(() => {
        console.log("Operation complete");
        callback();
    }, 1000);
});

// ========== SUMMARY ==========
console.log("\n=== SUMMARY ===");

console.log("1. Callbacks are functions passed as arguments");
console.log("2. Used for asynchronous operations");
console.log("3. Error-first callbacks are common in Node.js");
console.log("4. Callback hell can be solved with named functions or promises");
console.log("5. Array methods use callbacks extensively");
console.log("6. Event handlers use callbacks");
console.log("7. For complex async, use promises or async/await");
console.log("8. Always handle errors in callbacks");
console.log("9. Be mindful of this binding in callbacks");
console.log("10. Consider using promises for modern code");