// 26-json.js - Working with JSON (JavaScript Object Notation)

// ========== BASIC JSON ==========
console.log("=== BASIC JSON ===");

// JavaScript object
const user = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    hobbies: ["reading", "gaming", "coding"],
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    },
    isActive: true,
    createdAt: new Date()
};

console.log("Original object:", user);

// ========== JSON.STRINGIFY() ==========
console.log("\n=== JSON.STRINGIFY() ===");

// Convert object to JSON string
const jsonString = JSON.stringify(user);
console.log("JSON string:", jsonString);
console.log("Type:", typeof jsonString); // string

// Pretty print JSON
const prettyJson = JSON.stringify(user, null, 2);
console.log("Pretty JSON:\n", prettyJson);

// Stringify with replacer function
const filteredJson = JSON.stringify(user, (key, value) => {
    if (key === "email") return undefined; // Exclude email
    if (key === "createdAt") return value.toString(); // Convert date to string
    return value;
}, 2);
console.log("Filtered JSON:\n", filteredJson);

// ========== JSON.PARSE() ==========
console.log("\n=== JSON.PARSE() ===");

// Parse JSON string to object
const parsedUser = JSON.parse(jsonString);
console.log("Parsed object:", parsedUser);

// Parse with reviver function
const parsedWithReviver = JSON.parse(jsonString, (key, value) => {
    if (key === "createdAt") return new Date(value); // Convert back to Date
    return value;
});
console.log("Parsed with Date:", parsedWithReviver.createdAt);

// ========== JSON WITH DATES ==========
console.log("\n=== JSON WITH DATES ===");

// Handling dates in JSON
const event = {
    name: "Birthday Party",
    date: new Date(2024, 0, 15, 10, 30),
    description: "Annual birthday celebration"
};

// Stringify with custom date handling
const eventJson = JSON.stringify(event, (key, value) => {
    if (value instanceof Date) {
        return { __type: "Date", value: value.toISOString() };
    }
    return value;
});
console.log("Event JSON:", eventJson);

// Parse with custom date handling
const parsedEvent = JSON.parse(eventJson, (key, value) => {
    if (value && value.__type === "Date") {
        return new Date(value.value);
    }
    return value;
});
console.log("Parsed event:", parsedEvent);
console.log("Event date:", parsedEvent.date);

// ========== JSON WITH FUNCTIONS ==========
console.log("\n=== JSON WITH FUNCTIONS ===");

// Functions are not serializable
const objWithFunction = {
    name: "Calculator",
    add: function(a, b) { return a + b; }
};

const stringified = JSON.stringify(objWithFunction);
console.log("Function removed:", stringified);
// {"name":"Calculator"}

// Workaround: store function as string
const objWithFunctionString = {
    name: "Calculator",
    add: "function(a, b) { return a + b; }"
};
const parsedFunc = JSON.parse(JSON.stringify(objWithFunctionString));
console.log("Function as string:", parsedFunc.add);

// ========== JSON VALIDATION ==========
console.log("\n=== JSON VALIDATION ===");

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

console.log(isValidJSON('{"name":"John"}')); // true
console.log(isValidJSON('{name:"John"}')); // false
console.log(isValidJSON('{"name":"John",}')); // false
console.log(isValidJSON('[]')); // true

// ========== DEEP COPY WITH JSON ==========
console.log("\n=== DEEP COPY WITH JSON ===");

const originalObj = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [1, 2, 3]
};

const deepCopy = JSON.parse(JSON.stringify(originalObj));
deepCopy.b.c = 10;
deepCopy.f.push(4);

console.log("Original:", originalObj);
console.log("Deep copy:", deepCopy);

// ========== JSON WITH ARRAYS ==========
console.log("\n=== JSON WITH ARRAYS ===");

// Array of objects
const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 }
];

const usersJson = JSON.stringify(users, null, 2);
console.log("Users JSON:", usersJson);

const parsedUsers = JSON.parse(usersJson);
console.log("Parsed users:", parsedUsers);

// ========== JSON WITH SPECIAL CHARACTERS ==========
console.log("\n=== JSON WITH SPECIAL CHARACTERS ===");

const specialChars = {
    unicode: "Hello 世界 😀",
    escaped: "Line1\nLine2\tTab",
    quotes: 'She said "Hello"'
};

console.log("Special chars JSON:", JSON.stringify(specialChars));
console.log("Parsed:", JSON.parse(JSON.stringify(specialChars)));

// ========== JSON MANIPULATION ==========
console.log("\n=== JSON MANIPULATION ===");

// Merge JSON objects
const objA = { a: 1, b: 2 };
const objB = { b: 3, c: 4 };
const merged = { ...objA, ...objB };
console.log("Merged:", merged);

// Filter JSON object
const filterObj = { a: 1, b: 2, c: 3, d: 4 };
const filtered = Object.fromEntries(
    Object.entries(filterObj).filter(([key, value]) => value > 2)
);
console.log("Filtered:", filtered);

// Transform JSON object
const transformObj = { a: 1, b: 2, c: 3 };
const transformed = Object.fromEntries(
    Object.entries(transformObj).map(([key, value]) => [key, value * 2])
);
console.log("Transformed:", transformed);

// ========== JSON STORAGE EXAMPLE ==========
console.log("\n=== JSON STORAGE EXAMPLE ===");

// Simulating local storage
let db = {};

function saveToDB(key, data) {
    db[key] = JSON.stringify(data);
    console.log(`Saved: ${key}`);
}

function getFromDB(key) {
    const json = db[key];
    return json ? JSON.parse(json) : null;
}

saveToDB("user_1", { name: "John", age: 30 });
saveToDB("user_2", { name: "Jane", age: 25 });

console.log("User 1:", getFromDB("user_1"));
console.log("User 2:", getFromDB("user_2"));

console.log("Database:", db);

// ========== JSON REPLACER AND REVIVER ==========
console.log("\n=== JSON REPLACER AND REVIVER ===");

// Custom replacer - exclude sensitive data
const sensitiveData = {
    username: "john_doe",
    password: "secret123",
    email: "john@example.com",
    age: 30
};

const safeJson = JSON.stringify(sensitiveData, (key, value) => {
    if (key === "password") return undefined;
    return value;
}, 2);
console.log("Safe JSON:", safeJson);

// Custom reviver - restore specific types
const jsonWithTypes = JSON.stringify({
    name: "Product",
    price: 99.99,
    inStock: true,
    tags: ["electronics", "gadget"]
});

const restored = JSON.parse(jsonWithTypes, (key, value) => {
    if (typeof value === 'string' && value.includes('electronics')) {
        return value.toUpperCase();
    }
    return value;
});
console.log("Restored with modifications:", restored);

// ========== ERROR HANDLING WITH JSON ==========
console.log("\n=== ERROR HANDLING WITH JSON ===");

// Safe JSON parse
function safeJSONParse(str) {
    try {
        return { data: JSON.parse(str), error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}

console.log(safeJSONParse('{"name":"John"}'));
console.log(safeJSONParse('invalid json'));

// ========== PERFORMANCE TIP ==========
console.log("\n=== PERFORMANCE TIP ===");

// For large objects, avoid stringify/parse for deep copy
// Use structuredClone() for better performance (Node.js 17+)
if (typeof structuredClone === 'function') {
    const largeObj = { a: 1, b: { c: 2 } };
    const cloned = structuredClone(largeObj);
    console.log("Structured clone:", cloned);
}