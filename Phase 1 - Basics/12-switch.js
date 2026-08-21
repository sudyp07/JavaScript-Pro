// 12-switch.js - Switch statements in JavaScript

// Basic switch statement
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Tuesday":
        console.log("Second day");
        break;
    case "Wednesday":
        console.log("Midweek");
        break;
    case "Thursday":
        console.log("Almost Friday");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}

// Switch with numbers
let score = 85;
switch (true) {
    case score >= 90:
        console.log("A grade");
        break;
    case score >= 80:
        console.log("B grade");
        break;
    case score >= 70:
        console.log("C grade");
        break;
    case score >= 60:
        console.log("D grade");
        break;
    default:
        console.log("F grade");
}

// Switch with multiple cases
let fruit = "apple";
switch (fruit) {
    case "apple":
    case "pear":
    case "quince":
        console.log("It's a pome fruit");
        break;
    case "banana":
    case "mango":
    case "pineapple":
        console.log("It's a tropical fruit");
        break;
    case "orange":
    case "lemon":
    case "lime":
        console.log("It's a citrus fruit");
        break;
    default:
        console.log("Unknown fruit");
}

// Switch without break (fall-through)
let month = 2;
let days;
switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        days = 31;
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        days = 30;
        break;
    case 2:
        days = 28;
        break;
    default:
        days = "Invalid month";
}
console.log(`Days: ${days}`);

// Switch with expressions
let age = 25;
switch (true) {
    case age < 13:
        console.log("Child");
        break;
    case age >= 13 && age < 20:
        console.log("Teenager");
        break;
    case age >= 20 && age < 65:
        console.log("Adult");
        break;
    case age >= 65:
        console.log("Senior");
        break;
    default:
        console.log("Invalid age");
}

// Switch with string matching
let command = "start";
switch (command) {
    case "start":
        console.log("Starting application...");
        break;
    case "stop":
        console.log("Stopping application...");
        break;
    case "restart":
        console.log("Restarting application...");
        break;
    case "status":
        console.log("Application is running");
        break;
    default:
        console.log(`Unknown command: ${command}`);
}

// Switch with fall-through (intentional)
let type = "error";
switch (type) {
    case "error":
        console.log("Logging error...");
        // intentional fall-through
    case "warning":
        console.log("Logging warning...");
        break;
    case "info":
        console.log("Logging info...");
        break;
    default:
        console.log("Unknown log type");
}

// Switch with strict comparison
let value = "5";
switch (value) {
    case 5:
        console.log("Number 5");
        break;
    case "5":
        console.log("String 5");
        break;
    default:
        console.log("Other");
}
// Output: "String 5" (uses strict === comparison)

// Switch using function
function getDayType(day) {
    switch (day.toLowerCase()) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "Weekday";
        case "saturday":
        case "sunday":
            return "Weekend";
        default:
            return "Invalid day";
    }
}
console.log(getDayType("Monday")); // Weekday
console.log(getDayType("Sunday")); // Weekend