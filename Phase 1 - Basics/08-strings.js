// 08-strings.js - Working with strings in JavaScript

// Creating strings
let str1 = "Hello";
let str2 = 'World';
let str3 = `Template Literal`;

// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName); // "John Doe"

// Template literals (ES6)
let age = 25;
let message = `My name is ${firstName} and I am ${age} years old`;
console.log(message);

// String length
let text = "Hello World";
console.log(text.length); // 11

// Accessing characters
console.log(text[0]); // "H"
console.log(text[6]); // "W"
console.log(text.charAt(0)); // "H"

// Changing case
console.log(text.toUpperCase()); // "HELLO WORLD"
console.log(text.toLowerCase()); // "hello world"

// Finding substrings
console.log(text.indexOf("World")); // 6
console.log(text.indexOf("xyz")); // -1 (not found)
console.log(text.lastIndexOf("l")); // 9
console.log(text.includes("Hello")); // true
console.log(text.startsWith("He")); // true
console.log(text.endsWith("rld")); // true

// Extracting substrings
console.log(text.slice(0, 5)); // "Hello"
console.log(text.slice(6)); // "World"
console.log(text.substring(0, 5)); // "Hello"
console.log(text.substr(6, 3)); // "Wor"

// Splitting strings
let words = "apple,banana,orange";
console.log(words.split(",")); // ["apple", "banana", "orange"]
console.log(words.split("")); // ["a","p","p","l","e",...]

// Replacing content
console.log(text.replace("World", "JavaScript")); // "Hello JavaScript"
console.log(text.replace(/l/g, "x")); // "Hexxo Worxd" (global replace)

// Trimming whitespace
let messy = "  Hello World  ";
console.log(messy.trim()); // "Hello World"
console.log(messy.trimStart()); // "Hello World  "
console.log(messy.trimEnd()); // "  Hello World"

// Repeating strings
console.log("Ha".repeat(3)); // "HaHaHa"

// Padding strings
let num = "5";
console.log(num.padStart(3, "0")); // "005"
console.log(num.padEnd(3, "0")); // "500"

// Converting to string
let number = 123;
console.log(String(number)); // "123"
console.log(number.toString()); // "123"
console.log((123.45).toString()); // "123.45"

// Checking if string is empty
let empty = "";
console.log(empty.length === 0); // true
console.log(empty === ""); // true

// Joining strings from array
let fruits = ["apple", "banana", "orange"];
console.log(fruits.join(", ")); // "apple, banana, orange"

// Character codes
console.log("A".charCodeAt(0)); // 65
console.log(String.fromCharCode(65)); // "A"

// Additional string methods
let sample = "The quick brown fox";
console.log(sample.search("brown")); // 10
console.log(sample.match(/[a-z]+/g)); // ["The", "quick", "brown", "fox"]
console.log(sample.replace("brown", "red")); // "The quick red fox"