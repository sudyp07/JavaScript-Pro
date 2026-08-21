// 06-type-conversion.js - Converting between data types in JavaScript

// String to Number
let str = "123";
let num = Number(str);
console.log(num); // 123
console.log(typeof num); // number

// Another way - parseInt and parseFloat
console.log(parseInt("456")); // 456
console.log(parseInt("456.78")); // 456 (only whole number)
console.log(parseFloat("456.78")); // 456.78
console.log(Number("123abc")); // NaN (Not a Number)

// Number to String
let number = 123;
let string = String(number);
console.log(string); // "123"
console.log(typeof string); // string

// Another way
console.log(number.toString()); // "123"
console.log((123.45).toString()); // "123.45"

// Boolean to String
console.log(String(true)); // "true"
console.log(String(false)); // "false"

// String to Boolean
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false (empty string)
console.log(Boolean(" ")); // true (space is not empty)

// Number to Boolean
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean(-5)); // true
console.log(Boolean(NaN)); // false

// Boolean to Number
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// Automatic type conversion (coercion)
console.log("5" + 3); // "53" (string concatenation)
console.log("5" - 3); // 2 (converts to number)
console.log("5" * 2); // 10 (converts to number)
console.log("hello" * 2); // NaN (can't convert)

// Using + operator for conversion
console.log(+ "123"); // 123 (converts to number)
console.log("123" + 0); // "1230" (string)

// Using !! for boolean conversion
console.log(!!"hello"); // true
console.log(!!""); // false
console.log(!!1); // true
console.log(!!0); // false

// Converting to object
console.log(Object("hello")); // String object
console.log(Object(123)); // Number object

// Converting arrays to strings
let arr = [1, 2, 3];
console.log(arr.toString()); // "1,2,3"
console.log(JSON.stringify(arr)); // "[1,2,3]"

// Converting strings to arrays
let text = "hello";
console.log(text.split("")); // ["h","e","l","l","o"]

// Converting objects to strings
let person = { name: "John", age: 25 };
console.log(JSON.stringify(person)); // '{"name":"John","age":25}'

// Date to string/number
let date = new Date();
console.log(date.toString()); // String representation
console.log(date.getTime()); // Number (milliseconds)
console.log(Date.now()); // Current timestamp as number