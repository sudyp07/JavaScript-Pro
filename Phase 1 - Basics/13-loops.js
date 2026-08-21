// 13-loops.js - Loops in JavaScript

// for loop - when you know how many times to iterate
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// for loop with array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for loop with break
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // stops the loop
    }
    console.log(i);
}

// for loop with continue
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // skips even numbers
    }
    console.log(i); // prints odd numbers
}

// while loop - executes while condition is true
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// do-while loop - executes at least once
let num = 0;
do {
    console.log(`Number: ${num}`);
    num++;
} while (num < 5);

// for-of loop - iterates over array values
let colors = ["red", "green", "blue"];
for (let color of colors) {
    console.log(color);
}

// for-of loop with string
let word = "hello";
for (let char of word) {
    console.log(char);
}

// for-in loop - iterates over object properties
let person = {
    name: "John",
    age: 25,
    city: "NYC"
};
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// for-in with array (not recommended, use for-of)
let numbers = [10, 20, 30];
for (let index in numbers) {
    console.log(numbers[index]);
}

// Nested loops
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(`i=${i}, j=${j}`);
    }
}

// Loop with array methods
let items = ["a", "b", "c"];
items.forEach(function(item, index) {
    console.log(`${index}: ${item}`);
});

// forEach with arrow function
items.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});

// Infinite loop (be careful!)
// while (true) {
//     console.log("This runs forever");
// }

// Loop with condition
let i = 0;
while (i < fruits.length) {
    console.log(fruits[i]);
    i++;
}

// Using label with loops
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop; // breaks outer loop
        }
        console.log(`i=${i}, j=${j}`);
    }
}

// Loop through object keys
let user = { id: 1, name: "Alice", role: "admin" };
Object.keys(user).forEach(key => {
    console.log(`${key}: ${user[key]}`);
});

// Loop through object values
Object.values(user).forEach(value => {
    console.log(value);
});

// Loop through object entries
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});