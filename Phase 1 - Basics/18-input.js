// 18-input.js - Getting user input in JavaScript

// Note: This file contains examples for both browser and Node.js environments

// ========== BROWSER INPUT METHODS ==========

// 1. prompt() - Get input from user (browser only)
// let userName = prompt("Enter your name:");
// console.log(`Hello, ${userName}!`);

// 2. confirm() - Get yes/no confirmation (browser only)
// let isSure = confirm("Are you sure you want to continue?");
// console.log(isSure); // true or false

// 3. alert() - Show message (browser only)
// alert("This is an alert message!");

// ========== HTML INPUT EXAMPLES (browser) ==========

// HTML would look like:
/*
<input type="text" id="nameInput">
<button onclick="handleInput()">Submit</button>
<div id="output"></div>

<script>
function handleInput() {
    let input = document.getElementById("nameInput").value;
    document.getElementById("output").innerHTML = "Hello, " + input;
}
</script>
*/

// ========== NODE.JS INPUT METHODS ==========

// 1. Using readline module (Node.js)
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Simple question
rl.question('What is your name? ', (answer) => {
    console.log(`Hello, ${answer}!`);
    rl.close();
});

// Multiple questions
const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl2.question('Enter your name: ', (name) => {
    rl2.question('Enter your age: ', (age) => {
        console.log(`Name: ${name}, Age: ${age}`);
        rl2.close();
    });
});

// 2. Using readline with promises (Node.js)
const readlinePromises = require('readline/promises');

async function getInput() {
    const rl = readlinePromises.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const name = await rl.question('What is your name? ');
    const age = await rl.question('How old are you? ');
    
    console.log(`Hello ${name}, you are ${age} years old.`);
    rl.close();
}
// getInput(); // Uncomment to run

// 3. Command line arguments (Node.js)
// Run: node 18-input.js arg1 arg2 arg3
const args = process.argv.slice(2);
console.log('Command line arguments:', args);
console.log('First argument:', args[0]);

// 4. Using process.stdin (Node.js)
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    console.log(`You entered: ${input}`);
    process.exit();
});

// ========== SIMPLE INPUT HANDLING FUNCTIONS ==========

// Browser function
function getInputValue() {
    // In browser
    // return document.getElementById("inputId").value;
    return "Sample input";
}

// Node.js function using readline
function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Using the function
async function main() {
    // const name = await askQuestion("Enter your name: ");
    // console.log(`Hello ${name}!`);
}
main();

// ========== INPUT VALIDATION ==========

function validateInput(input) {
    if (!input || input.trim() === "") {
        return "Input cannot be empty";
    }
    if (input.length < 3) {
        return "Input must be at least 3 characters";
    }
    return "Valid input";
}

console.log(validateInput("")); // Input cannot be empty
console.log(validateInput("ab")); // Input must be at least 3 characters
console.log(validateInput("John")); // Valid input

// Number input validation
function getNumberInput(input) {
    const num = Number(input);
    if (isNaN(num)) {
        return "Please enter a valid number";
    }
    return num;
}

console.log(getNumberInput("abc")); // Please enter a valid number
console.log(getNumberInput("25")); // 25

// ========== MENU EXAMPLE ==========

function showMenu() {
    console.log("\n--- MENU ---");
    console.log("1. Option 1");
    console.log("2. Option 2");
    console.log("3. Exit");
}

// In Node.js with readline
async function menuExample() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    showMenu();
    rl.question('Choose an option: ', (choice) => {
        switch(choice) {
            case '1':
                console.log('You selected Option 1');
                break;
            case '2':
                console.log('You selected Option 2');
                break;
            case '3':
                console.log('Goodbye!');
                rl.close();
                return;
            default:
                console.log('Invalid option');
        }
        rl.close();
    });
}
// menuExample();

console.log("Note: Some input methods are commented out.");
console.log("Uncomment the ones you want to test in your environment.");