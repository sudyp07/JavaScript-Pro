// 23-string-methods.js - Advanced string methods and operations

// ========== TEMPLATE LITERALS ==========
console.log("=== TEMPLATE LITERALS ===");

const name = "John";
const age = 30;

// Basic interpolation
const greeting = `Hello, ${name}! You are ${age} years old.`;
console.log(greeting);

// Multi-line strings
const multiLine = `
    This is a
    multi-line
    string
`;
console.log(multiLine);

// Expressions in templates
const price = 10;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
console.log(total);

// Tagged templates
function tag(strings, ...values) {
    console.log(strings);
    console.log(values);
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] || '');
    }, '');
}
const tagged = tag`Hello ${name}, you are ${age} years old`;

// ========== STRING INTERPOLATION ==========
console.log("\n=== STRING INTERPOLATION ===");

const firstName = "Jane";
const lastName = "Doe";
const fullName = `${firstName} ${lastName}`;
console.log(fullName);

// Dynamic property access
const user = { name: "Alice", age: 25 };
console.log(`User: ${user.name}, Age: ${user.age}`);

// ========== MATCH AND SEARCH ==========
console.log("\n=== MATCH AND SEARCH ===");

const text = "The quick brown fox jumps over the lazy dog";

// match() - returns matches array
const matches = text.match(/the/gi);
console.log(matches); // ['The', 'the']

// match() with groups
const dateStr = "Today is 2024-01-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(dateMatch);
// ['2024-01-15', '2024', '01', '15', index: 9, input: 'Today is 2024-01-15']

// search() - returns index of first match
const searchIndex = text.search(/brown/);
console.log(searchIndex); // 10

// ========== REPLACE ADVANCED ==========
console.log("\n=== REPLACE ADVANCED ===");

// replace() with string
console.log(text.replace("brown", "red"));

// replace() with regex
console.log(text.replace(/the/gi, "a"));

// replace() with function
const result1 = text.replace(/\b\w{4}\b/g, (match) => {
    return match.toUpperCase();
});
console.log(result1);

// replaceAll()
const strReplace = "Hello Hello Hello";
console.log(strReplace.replaceAll("Hello", "Hi"));

// ========== SPLIT AND JOIN ==========
console.log("\n=== SPLIT AND JOIN ===");

// split() with regex
const csv = "apple,banana,orange";
const fruitsSplit = csv.split(",");
console.log(fruitsSplit); // ['apple', 'banana', 'orange']

// split() with limit
const numbers = "1,2,3,4,5";
console.log(numbers.split(",", 3)); // ['1', '2', '3']

// join()
const words = ["Hello", "World"];
console.log(words.join(" ")); // Hello World
console.log(words.join("-")); // Hello-World

// ========== PAD START AND PAD END ==========
console.log("\n=== PAD START AND PAD END ===");

const num = "5";
console.log(num.padStart(3, "0")); // 005
console.log(num.padEnd(3, "0")); // 500

// Padding with custom string
console.log(num.padStart(5, "0")); // 00005
console.log("abc".padStart(6, "xyz")); // xyzabc

// ========== TRIM METHODS ==========
console.log("\n=== TRIM METHODS ===");

const messy = "   Hello World   ";
console.log(messy.trim()); // Hello World
console.log(messy.trimStart()); // Hello World   
console.log(messy.trimEnd()); //    Hello World

// Removing specific characters
const customTrim = "---Hello---";
console.log(customTrim.replace(/^-+|-+$/g, "")); // Hello

// ========== STARTS WITH AND ENDS WITH ==========
console.log("\n=== STARTS WITH AND ENDS WITH ===");

const filename = "document.pdf";
console.log(filename.startsWith("doc")); // true
console.log(filename.endsWith(".pdf")); // true
console.log(filename.startsWith("Doc")); // false (case sensitive)

// With position parameter
console.log(filename.startsWith("file", 0)); // false
console.log(filename.endsWith("doc", 3)); // true

// ========== INCLUDES ==========
console.log("\n=== INCLUDES ===");

const sentence = "The quick brown fox";
console.log(sentence.includes("brown")); // true
console.log(sentence.includes("red")); // false

// With position parameter
console.log(sentence.includes("quick", 5)); // false

// ========== REPEAT ==========
console.log("\n=== REPEAT ===");

console.log("Ha".repeat(3)); // HaHaHa
console.log("=".repeat(10)); // ==========
console.log("Hello ".repeat(2)); // Hello Hello

// ========== SLICE AND SUBSTRING ==========
console.log("\n=== SLICE AND SUBSTRING ===");

const longText = "JavaScript is awesome";

// slice() - start, end (negative allowed)
console.log(longText.slice(0, 10)); // JavaScript
console.log(longText.slice(11)); // is awesome
console.log(longText.slice(-7)); // awesome
console.log(longText.slice(0, -8)); // JavaScript

// substring() - start, end (no negative)
console.log(longText.substring(0, 10)); // JavaScript
console.log(longText.substring(11)); // is awesome

// substr() - start, length (deprecated)
console.log(longText.substr(0, 10)); // JavaScript
console.log(longText.substr(11, 2)); // is

// ========== CHAR CODE AND FROM CHAR CODE ==========
console.log("\n=== CHAR CODE AND FROM CHAR CODE ===");

console.log("A".charCodeAt(0)); // 65
console.log("abc".charCodeAt(1)); // 98
console.log(String.fromCharCode(65, 66, 67)); // ABC

// ========== REGULAR EXPRESSIONS ==========
console.log("\n=== REGULAR EXPRESSIONS ===");

// Creating RegExp
const regex1 = /hello/;
const regex2 = new RegExp("hello");

// Test
console.log(/hello/.test("hello world")); // true
console.log(/world/.test("hello")); // false

// Exec
const execResult = /(\d+)-(\d+)/.exec("Product: 123-456");
console.log(execResult); // ['123-456', '123', '456']

// Common regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("test@example.com")); // true
console.log(emailRegex.test("invalid-email")); // false

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log(urlRegex.test("https://example.com")); // true

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
console.log(phoneRegex.test("+1-1234567890")); // true
console.log(phoneRegex.test("1234567890")); // true

// ========== UNICODE AND CHARACTER ENCODING ==========
console.log("\n=== UNICODE AND CHARACTER ENCODING ===");

// Unicode characters
console.log("\u{1F600}"); // 😀
console.log("\u{1F34E}"); // 🍎
console.log("Hello \u{1F44B}"); // Hello 👋

// Character length with Unicode
const emoji = "👋";
console.log(emoji.length); // 2 (surrogate pairs)
console.log([...emoji].length); // 1

// Normalization
const nfcStr = "e\u0301"; // e + combining acute
const nfdStr = "\u00E9"; // é
console.log(nfcStr === nfdStr); // false
console.log(nfcStr.normalize() === nfdStr.normalize()); // true

// ========== LOCALE COMPARISON ==========
console.log("\n=== LOCALE COMPARISON ===");

const items = ["réservé", "premier", "cliché", "communiqué"];
items.sort((a, b) => a.localeCompare(b, 'fr'));
console.log(items);
// ['cliché', 'communiqué', 'premier', 'réservé']

// Case-insensitive comparison
console.log("hello".localeCompare("HELLO", undefined, { sensitivity: 'accent' }));

// ========== STRING BUILDER (performance) ==========
console.log("\n=== STRING BUILDER ===");

// Efficient string building with array
const parts = [];
for (let i = 0; i < 10; i++) {
    parts.push(`Item ${i}`);
}
const efficientString = parts.join(", ");
console.log(efficientString);