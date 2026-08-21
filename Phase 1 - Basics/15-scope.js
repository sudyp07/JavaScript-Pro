// 15-scope.js - Variable scope in JavaScript

// Global scope - accessible everywhere
let globalVar = "I am global";
const globalConst = "Also global";

function testScope() {
    console.log(globalVar); // Accessible inside function
    console.log(globalConst); // Accessible inside function
}
testScope();
console.log(globalVar); // Accessible outside function

// Local/Function scope
function myFunction() {
    let localVar = "I am local";
    const localConst = "Also local";
    console.log(localVar); // Accessible inside
    console.log(localConst); // Accessible inside
}
myFunction();
// console.log(localVar); // Error - not defined outside

// Block scope (let and const)
if (true) {
    let blockVar = "I am block scoped";
    const blockConst = "Also block scoped";
    var varVar = "I am function scoped";
    console.log(blockVar); // Accessible inside block
    console.log(blockConst); // Accessible inside block
}
// console.log(blockVar); // Error - not defined outside
// console.log(blockConst); // Error - not defined outside
console.log(varVar); // Accessible outside (var is function scoped)

// var vs let vs const
var oldVar = "I am old";
let newLet = "I am new";
const newConst = "I am constant";

// var - function scoped, can be redeclared
var x = 10;
var x = 20; // Works
console.log(x); // 20

// let - block scoped, cannot be redeclared
let y = 10;
// let y = 20; // Error - cannot redeclare
y = 20; // Can reassign
console.log(y); // 20

// const - block scoped, cannot be reassigned
const z = 10;
// z = 20; // Error - cannot reassign
// const z = 20; // Error - cannot redeclare
console.log(z); // 10

// Scope chain
let outer = "outer";
function outerFunction() {
    let middle = "middle";
    function innerFunction() {
        let inner = "inner";
        console.log(outer); // Accessible (global)
        console.log(middle); // Accessible (parent scope)
        console.log(inner); // Accessible (own scope)
    }
    innerFunction();
    // console.log(inner); // Error - not in this scope
}
outerFunction();

// Lexical scoping
let name = "Global";
function outer() {
    let name = "Outer";
    function inner() {
        let name = "Inner";
        console.log(name); // "Inner" (nearest scope)
    }
    inner();
    console.log(name); // "Outer" (own scope)
}
outer();
console.log(name); // "Global" (global scope)

// Shadowing
let shadow = "Global";
function shadowTest() {
    let shadow = "Local"; // Shadows global
    console.log(shadow); // "Local"
    if (true) {
        let shadow = "Block"; // Shadows local
        console.log(shadow); // "Block"
    }
}
shadowTest();

// Hoisting
// var is hoisted (undefined until assigned)
console.log(hoistedVar); // undefined
var hoistedVar = "Hoisted";
// let and const are hoisted but not initialized (TDZ)
// console.log(hoistedLet); // ReferenceError
let hoistedLet = "Hoisted";

// Function hoisting
sayHello(); // Works (function declaration hoisted)
function sayHello() {
    console.log("Hello!");
}
// sayHi(); // Error (function expression not hoisted)
let sayHi = function() {
    console.log("Hi!");
};

// Strict mode affects scope
"use strict";
// let and const are block scoped
if (true) {
    let blockScoped = "Block";
}
// console.log(blockScoped); // Error
// Without strict mode, var would be accessible outside block

// Global object properties
// In browsers, var creates properties on window
// let and const do not
var globalWindow = "I am on window";
let notOnWindow = "Not on window";
// console.log(window.globalWindow); // Works in browser
// console.log(window.notOnWindow); // undefined