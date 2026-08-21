// 27-error-handling.js - Error handling in JavaScript

// ========== TRY/CATCH/FINALLY ==========
console.log("=== TRY/CATCH/FINALLY ===");

try {
    // Code that might throw an error
    console.log("Try block executed");
    const result = 10 / 0;
    console.log("Result:", result); // Infinity
    // throw new Error("Something went wrong!");
} catch (error) {
    // Handle the error
    console.log("Catch block executed");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);
} finally {
    // Always executed
    console.log("Finally block executed - cleanup");
}

// ========== THROWING ERRORS ==========
console.log("\n=== THROWING ERRORS ===");

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

try {
    console.log(divide(10, 2)); // 5
    console.log(divide(10, 0)); // Throws error
} catch (error) {
    console.log("Error:", error.message);
}

// ========== CUSTOM ERROR TYPES ==========
console.log("\n=== CUSTOM ERROR TYPES ===");

// Creating custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
        this.timestamp = new Date();
    }
}

class DatabaseError extends Error {
    constructor(message, query) {
        super(message);
        this.name = "DatabaseError";
        this.query = query;
        this.timestamp = new Date();
    }
}

// Using custom errors
function validateUser(user) {
    if (!user.name) {
        throw new ValidationError("Name is required", "name");
    }
    if (!user.email) {
        throw new ValidationError("Email is required", "email");
    }
    if (!user.email.includes("@")) {
        throw new ValidationError("Invalid email format", "email");
    }
    return true;
}

try {
    const user = { name: "John", email: "invalid-email" };
    validateUser(user);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Validation Error in field "${error.field}": ${error.message}`);
        console.log("Timestamp:", error.timestamp);
    } else if (error instanceof DatabaseError) {
        console.log(`Database Error: ${error.message}`);
        console.log("Query:", error.query);
    } else {
        console.log("Unknown error:", error.message);
    }
}

// ========== ERROR PROPAGATION ==========
console.log("\n=== ERROR PROPAGATION ===");

function functionA() {
    functionB();
}

function functionB() {
    functionC();
}

function functionC() {
    throw new Error("Error in function C");
}

try {
    functionA();
} catch (error) {
    console.log("Caught error:", error.message);
    console.log("Stack trace:", error.stack);
}

// ========== ASYNC ERROR HANDLING ==========
console.log("\n=== ASYNC ERROR HANDLING ===");

// With promises
function asyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Async operation failed"));
        }, 1000);
    });
}

asyncOperation()
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Promise error:", error.message));

// With async/await
async function handleAsync() {
    try {
        const result = await asyncOperation();
        console.log("Result:", result);
    } catch (error) {
        console.log("Async/await error:", error.message);
    }
}
handleAsync();

// ========== ERROR IN EVENTS ==========
console.log("\n=== ERROR IN EVENTS ===");

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
    console.log("Uncaught exception:", error.message);
    // Clean up and exit gracefully
    // process.exit(1);
});

// Handling unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled rejection:", reason);
    // Clean up and exit gracefully
});

// ========== ERROR PROPERTIES ==========
console.log("\n=== ERROR PROPERTIES ===");

try {
    throw new Error("Custom error message");
} catch (error) {
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);
    console.log("Cause:", error.cause);
}

// Error with cause
try {
    throw new Error("Outer error", { cause: new Error("Inner error") });
} catch (error) {
    console.log("Error with cause:", error.message);
    console.log("Cause:", error.cause?.message);
}

// ========== ERROR LOGGING ==========
console.log("\n=== ERROR LOGGING ===");

function logError(error, context) {
    console.log("--- ERROR LOG ---");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Context:", context);
    console.log("Error:", error.message);
    console.log("Stack:", error.stack);
    console.log("----------------");
}

try {
    throw new Error("Database connection failed");
} catch (error) {
    logError(error, { operation: "getUserData", userId: 123 });
}

// ========== RETRY LOGIC ==========
console.log("\n=== RETRY LOGIC ===");

async function retryOperation(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed:`, error.message);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Simulated operation that sometimes fails
let attemptCount = 0;
function unstableOperation() {
    attemptCount++;
    if (attemptCount < 3) {
        throw new Error(`Attempt ${attemptCount} failed`);
    }
    return "Success!";
}

retryOperation(unstableOperation, 3, 1000)
    .then(result => console.log("Result:", result))
    .catch(error => console.log("Final error:", error.message));

// ========== BETTER ERROR HANDLING ==========
console.log("\n=== BETTER ERROR HANDLING ===");

// Using Result pattern
class Result {
    constructor(success, value, error = null) {
        this.success = success;
        this.value = value;
        this.error = error;
    }

    static ok(value) {
        return new Result(true, value);
    }

    static fail(error) {
        return new Result(false, null, error);
    }

    isOk() {
        return this.success;
    }

    isFail() {
        return !this.success;
    }

    getOrElse(defaultValue) {
        return this.success ? this.value : defaultValue;
    }
}

function safeDivide(a, b) {
    try {
        if (b === 0) {
            return Result.fail(new Error("Division by zero"));
        }
        return Result.ok(a / b);
    } catch (error) {
        return Result.fail(error);
    }
}

const result1 = safeDivide(10, 2);
if (result1.isOk()) {
    console.log("Result:", result1.value);
} else {
    console.log("Error:", result1.error.message);
}

const result2 = safeDivide(10, 0);
if (result2.isFail()) {
    console.log("Error:", result2.error.message);
}

// ========== ERROR HANDLING BEST PRACTICES ==========
console.log("\n=== ERROR HANDLING BEST PRACTICES ===");

console.log("1. Always handle errors with try/catch for synchronous code");
console.log("2. Use .catch() or try/catch with async/await for promises");
console.log("3. Create custom error classes for specific error types");
console.log("4. Log errors with context for debugging");
console.log("5. Don't swallow errors - rethrow or handle appropriately");
console.log("6. Use finally for cleanup operations");
console.log("7. Validate input data early");
console.log("8. Use meaningful error messages");
console.log("9. Consider using Result pattern for expected failures");
console.log("10. Implement retry logic for transient failures");
console.log("11. Handle uncaught exceptions and unhandled rejections");
console.log("12. Use error cause for nested errors");