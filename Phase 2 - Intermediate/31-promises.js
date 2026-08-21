// 31-promises.js - Promises and asynchronous programming

// ========== CREATING PROMISES ==========
console.log("=== CREATING PROMISES ===");

// Basic promise
const promise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Using the promise
promise
    .then(result => console.log("Result:", result))
    .catch(error => console.log("Error:", error.message))
    .finally(() => console.log("Promise settled (finally)"));

// ========== PROMISE STATES ==========
console.log("\n=== PROMISE STATES ===");

const pendingPromise = new Promise((resolve, reject) => {
    // Pending state
    console.log("Promise is pending");
});

const resolvedPromise = Promise.resolve("Immediately resolved");
resolvedPromise.then(result => console.log("Resolved:", result));

const rejectedPromise = Promise.reject(new Error("Immediately rejected"));
rejectedPromise.catch(error => console.log("Rejected:", error.message));

// ========== PROMISE CHAINING ==========
console.log("\n=== PROMISE CHAINING ===");

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data"), 500);
    });
}

function processData(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${data} processed`), 500);
    });
}

function saveData(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${data} saved`), 500);
    });
}

// Promise chain
fetchData()
    .then(data => processData(data))
    .then(processed => saveData(processed))
    .then(result => console.log("Final result:", result))
    .catch(error => console.error("Error:", error));

// ========== ERROR HANDLING IN PROMISES ==========
console.log("\n=== ERROR HANDLING IN PROMISES ===");

function riskyOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("Success!");
            } else {
                reject(new Error("Random failure"));
            }
        }, 500);
    });
}

// Multiple error handlers
riskyOperation()
    .then(result => {
        console.log("Result:", result);
        return result.toUpperCase();
    })
    .then(processed => {
        console.log("Processed:", processed);
    })
    .catch(error => {
        console.error("Error caught:", error.message);
    })
    .finally(() => {
        console.log("Operation complete");
    });

// ========== PROMISE.ALL ==========
console.log("\n=== PROMISE.ALL ===");

function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// Wait for all promises to resolve
const promises = [
    delay(1000, "First"),
    delay(500, "Second"),
    delay(200, "Third")
];

Promise.all(promises)
    .then(results => console.log("All results:", results))
    .catch(error => console.error("One failed:", error));

// Promise.all with failure
const promisesWithFailure = [
    delay(1000, "First"),
    Promise.reject(new Error("Failed!")),
    delay(200, "Third")
];

Promise.all(promisesWithFailure)
    .then(results => console.log("All results:", results))
    .catch(error => console.error("Error:", error.message));

// ========== PROMISE.ALLSETTLED ==========
console.log("\n=== PROMISE.ALLSETTLED ===");

Promise.allSettled(promisesWithFailure)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index}:`, result.value);
            } else {
                console.log(`Promise ${index}:`, result.reason.message);
            }
        });
    });

// ========== PROMISE.RACE ==========
console.log("\n=== PROMISE.RACE ===");

// First promise to settle wins
Promise.race([
    delay(1000, "Slow"),
    delay(200, "Fast"),
    delay(500, "Medium")
])
.then(result => console.log("Race winner:", result));

// ========== PROMISE.ANY ==========
console.log("\n=== PROMISE.ANY ===");

// First fulfilled promise wins (ignores rejections)
Promise.any([
    Promise.reject(new Error("Fail 1")),
    delay(200, "Success 1"),
    Promise.reject(new Error("Fail 2")),
    delay(500, "Success 2")
])
.then(result => console.log("Any result:", result))
.catch(error => console.error("All failed:", error.message));

// ========== ASYNC/AWAIT ==========
console.log("\n=== ASYNC/AWAIT ===");

// Async function
async function getData() {
    return "Async data";
}

getData().then(data => console.log("Async result:", data));

// Await
async function processDataAsync() {
    try {
        const data = await fetchData();
        console.log("Fetched:", data);
        const processed = await processData(data);
        console.log("Processed:", processed);
        const saved = await saveData(processed);
        console.log("Saved:", saved);
        return saved;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

processDataAsync();

// ========== PARALLEL WITH ASYNC/AWAIT ==========
console.log("\n=== PARALLEL WITH ASYNC/AWAIT ===");

async function parallelOperations() {
    try {
        // Run in parallel
        const [result1, result2, result3] = await Promise.all([
            delay(1000, "First"),
            delay(500, "Second"),
            delay(200, "Third")
        ]);
        console.log("Parallel results:", result1, result2, result3);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

parallelOperations();

// ========== ERROR HANDLING WITH ASYNC/AWAIT ==========
console.log("\n=== ERROR HANDLING WITH ASYNC/AWAIT ===");

async function handleErrors() {
    try {
        const result = await riskyOperation();
        console.log("Result:", result);
    } catch (error) {
        console.error("Caught error:", error.message);
    }
}

handleErrors();

// ========== FETCH WITH PROMISES ==========
console.log("\n=== FETCH WITH PROMISES ===");

// Simulating fetch
function fetchUser(id) {
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

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", userId },
                { id: 2, title: "Post 2", userId }
            ]);
        }, 500);
    });
}

// Using promises
fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });

// Using async/await
async function getUserData() {
    try {
        const user = await fetchUser(1);
        console.log("User (async):", user);
        const posts = await fetchPosts(user.id);
        console.log("Posts (async):", posts);
    } catch (error) {
        console.error("Error (async):", error.message);
    }
}

getUserData();

// ========== RETRY LOGIC WITH PROMISES ==========
console.log("\n=== RETRY LOGIC WITH PROMISES ===");

function retry(fn, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        function attempt() {
            fn()
                .then(resolve)
                .catch(error => {
                    if (retries === 0) {
                        reject(error);
                    } else {
                        console.log(`Retrying... ${retries} attempts left`);
                        retries--;
                        setTimeout(attempt, delay);
                    }
                });
        }
        attempt();
    });
}

let attemptCounter = 0;
function unstableOperation2() {
    return new Promise((resolve, reject) => {
        attemptCounter++;
        if (attemptCounter < 3) {
            reject(new Error(`Attempt ${attemptCounter} failed`));
        } else {
            resolve("Success!");
        }
    });
}

retry(unstableOperation2, 3, 500)
    .then(result => console.log("Retry result:", result))
    .catch(error => console.error("Retry failed:", error.message));

// ========== PROMISE UTILITIES ==========
console.log("\n=== PROMISE UTILITIES ===");

// Timeout helper
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    });
}

async function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        timeout(ms)
    ]);
}

const slowOperation = delay(2000, "Slow data");

withTimeout(slowOperation, 1000)
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Timeout error:", error.message));

// ========== PROMISE PROGRESS (simulated) ==========
console.log("\n=== PROMISE PROGRESS ===");

function uploadFile() {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            console.log(`Progress: ${progress}%`);
            if (progress >= 100) {
                clearInterval(interval);
                resolve("Upload complete!");
            }
        }, 200);
    });
}

uploadFile().then(result => console.log(result));

// ========== SUMMARY ==========
console.log("\n=== SUMMARY ===");

console.log("1. Promises represent asynchronous operations");
console.log("2. States: pending, fulfilled, rejected");
console.log("3. Methods: then(), catch(), finally()");
console.log("4. Promise.all() - wait for all promises");
console.log("5. Promise.race() - first promise to settle");
console.log("6. Promise.any() - first fulfilled promise");
console.log("7. Promise.allSettled() - wait for all to settle");
console.log("8. Async/await provides cleaner syntax");
console.log("9. Always handle errors with try/catch in async functions");
console.log("10. Use Promise.all for parallel operations");
console.log("11. Implement retry logic for transient failures");
console.log("12. Use timeout helpers to prevent hanging operations");