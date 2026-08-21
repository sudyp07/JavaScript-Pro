// 21-arrays-advanced.js - Advanced array methods and operations

// ========== ARRAY DESTRUCTURING ==========
console.log("=== ARRAY DESTRUCTURING ===");

// Basic destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first, second, third); // red green blue

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary); // red blue

// Rest operator with arrays
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [a = 10, b = 20] = [5];
console.log(a, b); // 5 20

// Swapping variables
let x = 10, y = 20;
[x, y] = [y, x];
console.log(x, y); // 20 10

// ========== SPREAD OPERATOR ==========
console.log("\n=== SPREAD OPERATOR ===");

// Copying arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]

// Merging arrays
const arr3 = [4, 5, 6];
const merged = [...arr1, ...arr3];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Adding elements to array
const newArray = [0, ...arr1, 4];
console.log(newArray); // [0, 1, 2, 3, 4]

// ========== ARRAY.FROM() AND ARRAY.OF() ==========
console.log("\n=== ARRAY.FROM() AND ARRAY.OF() ===");

// Array.from() - creates array from iterable
const str = "hello";
const chars = Array.from(str);
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// Array.from() with map function
const doubledNumbers = Array.from([1, 2, 3], x => x * 2);
console.log(doubledNumbers); // [2, 4, 6]

// Array.from() with array-like object
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr = Array.from(arrayLike);
console.log(arr); // ['a', 'b', 'c']

// Array.of() - creates array from arguments
const arrOf = Array.of(1, 2, 3);
console.log(arrOf); // [1, 2, 3]

// ========== FILL AND COPYWITHIN ==========
console.log("\n=== FILL AND COPYWITHIN ===");

// fill() - fills array with value
const fillArray = [1, 2, 3, 4, 5];
fillArray.fill(0);
console.log(fillArray); // [0, 0, 0, 0, 0]

// fill() with start and end
const partialFill = [1, 2, 3, 4, 5];
partialFill.fill(9, 1, 3);
console.log(partialFill); // [1, 9, 9, 4, 5]

// copyWithin() - copies part of array to another location
const copyArray = [1, 2, 3, 4, 5];
copyArray.copyWithin(0, 3);
console.log(copyArray); // [4, 5, 3, 4, 5]

// ========== FLAT AND FLATMAP ==========
console.log("\n=== FLAT AND FLATMAP ===");

// flat() - flattens nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap() - map then flatten
const words = ["hello", "world"];
const chars = words.flatMap(word => word.split(""));
console.log(chars); // ['h','e','l','l','o','w','o','r','l','d']

// ========== SORTING WITH CUSTOM COMPARATOR ==========
console.log("\n=== SORTING WITH CUSTOM COMPARATOR ===");

// Sorting numbers (ascending)
const numbers = [3, 1, 4, 1, 5, 9, 2];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 2, 3, 4, 5, 9]

// Sorting numbers (descending)
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 5, 4, 3, 2, 1, 1]

// Sorting objects
const people = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];
people.sort((a, b) => a.age - b.age);
console.log(people);
// [{name: "Jane", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]

// ========== FIND AND FINDINDEX ==========
console.log("\n=== FIND AND FINDINDEX ===");

const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 }
];

// find() - returns first matching element
const found = inventory.find(item => item.name === "cherries");
console.log(found); // {name: "cherries", quantity: 5}

// findIndex() - returns index of first matching element
const index = inventory.findIndex(item => item.quantity === 0);
console.log(index); // 1

// ========== EVERY AND SOME ==========
console.log("\n=== EVERY AND SOME ===");

const ages = [18, 21, 25, 30];

// every() - checks if all elements pass test
const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // true

// some() - checks if any element passes test
const hasTeenager = ages.some(age => age < 18);
console.log(hasTeenager); // false

// ========== REDUCE ADVANCED ==========
console.log("\n=== REDUCE ADVANCED ===");

// Counting occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // {apple: 3, banana: 2, orange: 1}

// Grouping objects by property
const users = [
    { name: "John", age: 25, city: "NYC" },
    { name: "Jane", age: 30, city: "LA" },
    { name: "Bob", age: 25, city: "NYC" },
    { name: "Alice", age: 30, city: "LA" }
];
const groupedByAge = users.reduce((acc, user) => {
    acc[user.age] = acc[user.age] || [];
    acc[user.age].push(user);
    return acc;
}, {});
console.log(groupedByAge);

// ========== ARRAY CHAINING ==========
console.log("\n=== ARRAY CHAINING ===");

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = data
    .filter(n => n % 2 === 0)      // [2, 4, 6, 8, 10]
    .map(n => n * 2)                // [4, 8, 12, 16, 20]
    .reduce((sum, n) => sum + n, 0); // 60
console.log(result); // 60

// ========== UNIQUE VALUES ==========
console.log("\n=== UNIQUE VALUES ===");

const duplicates = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
const unique = [...new Set(duplicates)];
console.log(unique); // [1, 2, 3, 4]

// ========== ARRAY METHODS SUMMARY ==========
console.log("\n=== ARRAY METHODS SUMMARY ===");

console.log("push() - Add to end");
console.log("pop() - Remove from end");
console.log("unshift() - Add to beginning");
console.log("shift() - Remove from beginning");
console.log("map() - Transform each element");
console.log("filter() - Filter based on condition");
console.log("reduce() - Reduce to single value");
console.log("forEach() - Iterate over elements");
console.log("some() - Check if any element passes");
console.log("every() - Check if all elements pass");
console.log("find() - Find first matching element");
console.log("findIndex() - Find index of first match");
console.log("includes() - Check if element exists");
console.log("indexOf() - Find index of element");
console.log("sort() - Sort elements");
console.log("reverse() - Reverse order");
console.log("slice() - Extract portion");
console.log("splice() - Add/remove elements");