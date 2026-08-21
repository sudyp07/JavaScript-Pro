// 16-arrays.js - Working with arrays in JavaScript

// Creating arrays
let emptyArray = [];
let numbers = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "orange"];
let mixed = [1, "hello", true, null, { name: "John" }];

// Accessing array elements
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[2]); // "orange"
console.log(fruits[3]); // undefined (out of bounds)

// Array length
console.log(fruits.length); // 3

// Modifying elements
fruits[1] = "grape";
console.log(fruits); // ["apple", "grape", "orange"]

// Adding elements
fruits.push("mango"); // Add to end
console.log(fruits); // ["apple", "grape", "orange", "mango"]
fruits.unshift("strawberry"); // Add to beginning
console.log(fruits); // ["strawberry", "apple", "grape", "orange", "mango"]

// Removing elements
let last = fruits.pop(); // Remove from end
console.log(last); // "mango"
console.log(fruits); // ["strawberry", "apple", "grape", "orange"]
let first = fruits.shift(); // Remove from beginning
console.log(first); // "strawberry"
console.log(fruits); // ["apple", "grape", "orange"]

// Finding elements
console.log(fruits.indexOf("grape")); // 1
console.log(fruits.indexOf("watermelon")); // -1
console.log(fruits.includes("apple")); // true
console.log(fruits.includes("pear")); // false

// Array methods
let numbers2 = [3, 1, 4, 1, 5];
console.log(numbers2.sort()); // [1, 1, 3, 4, 5]
console.log(numbers2.reverse()); // [5, 4, 3, 1, 1]

// Slicing and splicing
let sliced = fruits.slice(1, 3); // ["grape", "orange"]
console.log(sliced);
console.log(fruits); // Original unchanged

fruits.splice(1, 1, "kiwi", "pear"); // Remove 1, add 2
console.log(fruits); // ["apple", "kiwi", "pear", "orange"]

// Array iteration
let colors = ["red", "green", "blue"];
// for loop
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}
// for-of
for (let color of colors) {
    console.log(color);
}
// forEach
colors.forEach(function(color) {
    console.log(color);
});
// forEach with arrow function
colors.forEach(color => console.log(color));

// Map - create new array
let numbers3 = [1, 2, 3, 4, 5];
let doubled = numbers3.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter - create new array with condition
let evens = numbers3.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// Reduce - reduce to single value
let sum = numbers3.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Some and Every
let hasEven = numbers3.some(num => num % 2 === 0);
console.log(hasEven); // true
let allEven = numbers3.every(num => num % 2 === 0);
console.log(allEven); // false

// Find and FindIndex
let firstEven = numbers3.find(num => num % 2 === 0);
console.log(firstEven); // 2
let firstEvenIndex = numbers3.findIndex(num => num % 2 === 0);
console.log(firstEvenIndex); // 1

// Joining arrays
let joined = fruits.join(", ");
console.log(joined); // "apple, kiwi, pear, orange"

// Concatenating arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// Spread operator
let combined2 = [...arr1, ...arr2];
console.log(combined2); // [1, 2, 3, 4]

// Multi-dimensional arrays
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[0][1]); // 2
console.log(matrix[1][2]); // 6

// Array destructuring
let [a, b, c] = [10, 20, 30];
console.log(a, b, c); // 10 20 30

// Skip elements
let [first2, , third2] = [100, 200, 300];
console.log(first2, third2); // 100 300

// Rest operator
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]