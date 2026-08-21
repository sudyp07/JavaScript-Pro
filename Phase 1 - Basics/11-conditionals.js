// 11-conditionals.js - Conditional statements in JavaScript

// if statement
let age = 18;
if (age >= 18) {
    console.log("You are an adult");
}

// if-else statement
let score = 85;
if (score >= 60) {
    console.log("You passed!");
} else {
    console.log("You failed!");
}

// if-else if-else statement
let grade = 75;
if (grade >= 90) {
    console.log("A grade");
} else if (grade >= 80) {
    console.log("B grade");
} else if (grade >= 70) {
    console.log("C grade");
} else if (grade >= 60) {
    console.log("D grade");
} else {
    console.log("F grade");
}

// Multiple conditions with && (AND)
let isStudent = true;
let hasID = true;
if (isStudent && hasID) {
    console.log("You get a student discount");
}

// Multiple conditions with || (OR)
let isWeekend = true;
let isHoliday = false;
if (isWeekend || isHoliday) {
    console.log("No work today!");
}

// Using ! (NOT)
let isLoggedIn = false;
if (!isLoggedIn) {
    console.log("Please log in first");
}

// Ternary operator (shorthand if-else)
let age2 = 20;
let status = (age2 >= 18) ? "Adult" : "Minor";
console.log(status);

// Nested conditionals
let temperature = 25;
let isRaining = false;
if (temperature > 20) {
    if (isRaining) {
        console.log("Warm and rainy");
    } else {
        console.log("Warm and sunny");
    }
} else {
    console.log("Cold weather");
}

// Switch statement
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Midweek");
}

// Switch with multiple cases
let fruit = "apple";
switch (fruit) {
    case "apple":
    case "pear":
        console.log("It's a pome fruit");
        break;
    case "banana":
    case "mango":
        console.log("It's a tropical fruit");
        break;
    default:
        console.log("Unknown fruit");
}

// Truthy and Falsy values in conditionals
// Falsy values: false, 0, "", null, undefined, NaN
let value = "";
if (value) {
    console.log("This runs for truthy values");
} else {
    console.log("This runs for falsy values");
}

// Checking if variable exists
let userInput = null;
if (userInput === null || userInput === undefined) {
    console.log("No input provided");
}

// Nullish coalescing (??) - only checks null or undefined
let username = null;
let displayName = username ?? "Guest";
console.log(displayName); // "Guest"

// Optional chaining for safe property access
let person = { name: "John", address: { city: "NYC" } };
console.log(person?.address?.city); // "NYC"
console.log(person?.contact?.phone); // undefined (no error)