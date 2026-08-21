// 42-testing.js - Testing in JavaScript

// ========== UNIT TESTING ==========
console.log("=== UNIT TESTING ===");

// Functions to test
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

function isEven(num) {
    return num % 2 === 0;
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Simple test framework
class TestFramework {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    test(name, fn) {
        this.tests.push({ name, fn });
    }
    
    assert(condition, message) {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    }
    
    assertEquals(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    }
    
    assertThrows(fn, expectedError) {
        try {
            fn();
            throw new Error("Expected error but none was thrown");
        } catch (error) {
            if (expectedError && !(error instanceof expectedError)) {
                throw new Error(`Expected ${expectedError.name}, got ${error.constructor.name}`);
            }
        }
    }
    
    run() {
        console.log("Running tests...\n");
        this.tests.forEach(({ name, fn }) => {
            try {
                fn.call(this);
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}: ${error.message}`);
                this.failed++;
            }
        });
        
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
        console.log(`Total: ${this.tests.length} tests`);
    }
}

// Writing tests
const test = new TestFramework();

test.test("add should correctly add two numbers", function() {
    this.assertEquals(add(2, 3), 5);
    this.assertEquals(add(-1, 1), 0);
    this.assertEquals(add(0, 0), 0);
});

test.test("subtract should correctly subtract two numbers", function() {
    this.assertEquals(subtract(5, 3), 2);
    this.assertEquals(subtract(3, 5), -2);
    this.assertEquals(subtract(0, 0), 0);
});

test.test("multiply should correctly multiply two numbers", function() {
    this.assertEquals(multiply(2, 3), 6);
    this.assertEquals(multiply(-2, 3), -6);
    this.assertEquals(multiply(0, 5), 0);
});

test.test("divide should correctly divide two numbers", function() {
    this.assertEquals(divide(6, 3), 2);
    this.assertEquals(divide(5, 2), 2.5);
});

test.test("divide should throw error when dividing by zero", function() {
    this.assertThrows(() => divide(5, 0), Error);
});

test.test("isEven should correctly identify even numbers", function() {
    this.assertTrue(isEven(2));
    this.assertTrue(isEven(0));
    this.assertFalse(isEven(3));
    this.assertFalse(isEven(-1));
});

test.test("capitalize should capitalize first letter", function() {
    this.assertEquals(capitalize("hello"), "Hello");
    this.assertEquals(capitalize("HELLO"), "Hello");
    this.assertEquals(capitalize("hELLO"), "Hello");
    this.assertEquals(capitalize(""), "");
});

// Run tests
test.run();

// ========== MOCKING ==========
console.log("\n=== MOCKING ===");

// Service to mock
class UserService {
    constructor(api) {
        this.api = api;
    }
    
    async getUser(id) {
        const data = await this.api.get(`/users/${id}`);
        return data;
    }
}

// Mock API
class MockAPI {
    constructor() {
        this.calls = [];
    }
    
    async get(url) {
        this.calls.push(url);
        return { id: 1, name: "John", email: "john@example.com" };
    }
}

// Test with mock
async function testUserService() {
    const mockAPI = new MockAPI();
    const userService = new UserService(mockAPI);
    const user = await userService.getUser(1);
    console.log("User:", user);
    console.log("API calls:", mockAPI.calls);
}

testUserService();

// ========== INTEGRATION TESTING ==========
console.log("\n=== INTEGRATION TESTING ===");

// Integration test example
async function testDatabaseIntegration() {
    try {
        // Simulated database operations
        console.log("Testing database integration...");
        
        const db = {
            connected: false,
            connect() {
                this.connected = true;
                return this;
            },
            query(sql) {
                if (!this.connected) throw new Error("Not connected");
                return { rows: [{ id: 1, name: "John" }] };
            },
            close() {
                this.connected = false;
                return this;
            }
        };
        
        // Test connection
        db.connect();
        console.log("Connected:", db.connected);
        
        // Test query
        const result = db.query("SELECT * FROM users");
        console.log("Query result:", result);
        
        // Test disconnection
        db.close();
        console.log("Disconnected:", db.connected);
        
        console.log("Integration test passed");
    } catch (error) {
        console.error("Integration test failed:", error.message);
    }
}

testDatabaseIntegration();

// ========== END-TO-END TESTING ==========
console.log("\n=== END-TO-END TESTING ===");

// Simulating end-to-end test
async function testUserFlow() {
    console.log("E2E Test: User registration and login flow");
    
    try {
        // Step 1: Register
        const registerData = {
            username: "john_doe",
            email: "john@example.com",
            password: "secure_password"
        };
        console.log("1. Register:", registerData);
        
        // Step 2: Login
        const loginData = {
            email: "john@example.com",
            password: "secure_password"
        };
        console.log("2. Login:", loginData);
        
        // Step 3: Profile
        const profile = {
            id: 1,
            username: "john_doe",
            email: "john@example.com"
        };
        console.log("3. Profile:", profile);
        
        // Step 4: Logout
        console.log("4. Logout successful");
        
        console.log("E2E test passed");
    } catch (error) {
        console.error("E2E test failed:", error.message);
    }
}

testUserFlow();

// ========== TEST COVERAGE ==========
console.log("\n=== TEST COVERAGE ===");

function calculateTotalPrice(items, taxRate = 0.08) {
    if (!Array.isArray(items)) throw new Error("Items must be an array");
    if (taxRate < 0 || taxRate > 1) throw new Error("Invalid tax rate");
    
    const subtotal = items.reduce((sum, item) => {
        if (!item.price || !item.quantity) throw new Error("Invalid item");
        return sum + (item.price * item.quantity);
    }, 0);
    
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return {
        subtotal,
        tax,
        total,
        items
    };
}

// Test coverage example
function testCalculateTotalPrice() {
    const tests = [
        {
            name: "Should calculate total with no items",
            items: [],
            expected: { subtotal: 0, tax: 0, total: 0 }
        },
        {
            name: "Should calculate total with items",
            items: [{ price: 10, quantity: 2 }, { price: 5, quantity: 1 }],
            expected: { subtotal: 25, tax: 2, total: 27 }
        },
        {
            name: "Should handle custom tax rate",
            items: [{ price: 100, quantity: 1 }],
            taxRate: 0.1,
            expected: { subtotal: 100, tax: 10, total: 110 }
        }
    ];
    
    tests.forEach(testCase => {
        try {
            const result = calculateTotalPrice(testCase.items, testCase.taxRate);
            if (result.total === testCase.expected.total) {
                console.log(`✅ ${testCase.name}`);
            } else {
                console.log(`❌ ${testCase.name}: Expected ${testCase.expected.total}, got ${result.total}`);
            }
        } catch (error) {
            console.log(`❌ ${testCase.name}: ${error.message}`);
        }
    });
}

testCalculateTotalPrice();

// ========== TESTING BEST PRACTICES ==========
console.log("\n=== TESTING BEST PRACTICES ===");

console.log("1. Write tests before code (TDD)");
console.log("2. Keep tests small and focused");
console.log("3. Use descriptive test names");
console.log("4. Test both success and failure cases");
console.log("5. Use mocks for external dependencies");
console.log("6. Maintain test independence");
console.log("7. Run tests frequently");
console.log("8. Aim for high test coverage");
console.log("9. Use assertions effectively");
console.log("10. Keep tests maintainable");
console.log("11. Test edge cases");
console.log("12. Use test frameworks (Jest, Mocha)");