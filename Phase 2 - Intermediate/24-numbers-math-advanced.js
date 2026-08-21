// 24-numbers-math-advanced.js - Advanced number and math operations

// ========== NUMBER PRECISION ==========
console.log("=== NUMBER PRECISION ===");

// Floating point precision issues
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Fixing precision with toFixed()
console.log((0.1 + 0.2).toFixed(1)); // 0.3

// Using Number.EPSILON for comparison
function areEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}
console.log(areEqual(0.1 + 0.2, 0.3)); // true

// ========== NUMBER CHECKING ==========
console.log("\n=== NUMBER CHECKING ===");

// isInteger()
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(42.5)); // false

// isFinite()
console.log(Number.isFinite(42)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite("42")); // false (string)

// isNaN()
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false
console.log(Number.isNaN(undefined)); // false

// parseInt() and parseFloat()
console.log(parseInt("42.5")); // 42
console.log(parseFloat("42.5")); // 42.5
console.log(parseInt("42px")); // 42
console.log(parseInt("0xFF", 16)); // 255 (hex)

// ========== ROUNDING METHODS ==========
console.log("\n=== ROUNDING METHODS ===");

const value = 4.7;
console.log(Math.floor(value)); // 4
console.log(Math.ceil(value)); // 5
console.log(Math.round(value)); // 5
console.log(Math.trunc(value)); // 4

const negativeValue = -4.7;
console.log(Math.floor(negativeValue)); // -5
console.log(Math.ceil(negativeValue)); // -4
console.log(Math.round(negativeValue)); // -5
console.log(Math.trunc(negativeValue)); // -4

// ========== ROUNDING TO DECIMAL PLACES ==========
console.log("\n=== ROUNDING TO DECIMAL PLACES ===");

const pi = 3.14159;

// Custom rounding function
function roundToDecimal(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}
console.log(roundToDecimal(pi, 2)); // 3.14
console.log(roundToDecimal(pi, 3)); // 3.142

// Using toFixed()
console.log(pi.toFixed(2)); // "3.14"
console.log(pi.toFixed(3)); // "3.142"

// toPrecision()
console.log(pi.toPrecision(3)); // "3.14"
console.log(pi.toPrecision(4)); // "3.142"

// ========== RANDOM NUMBER GENERATION ==========
console.log("\n=== RANDOM NUMBER GENERATION ===");

// Random between 0 and 1
console.log(Math.random());

// Random between min and max (inclusive)
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomBetween(1, 10));

// Random floating point between min and max
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
console.log(randomFloat(1, 10));

// Random item from array
const items = ["apple", "banana", "orange", "grape"];
const randomItem = items[Math.floor(Math.random() * items.length)];
console.log(randomItem);

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
console.log(shuffleArray(items));

// ========== ADVANCED MATH METHODS ==========
console.log("\n=== ADVANCED MATH METHODS ===");

// pow() and sqrt()
console.log(Math.pow(2, 3)); // 8
console.log(Math.sqrt(16)); // 4
console.log(Math.cbrt(27)); // 3 (cube root)

// Trigonometric functions
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(0)); // 1
console.log(Math.tan(Math.PI / 4)); // 1

// Logarithmic functions
console.log(Math.log(Math.E)); // 1
console.log(Math.log10(100)); // 2
console.log(Math.log2(8)); // 3

// Exponential
console.log(Math.exp(1)); // 2.718...
console.log(Math.exp(2)); // 7.389...

// Absolute value
console.log(Math.abs(-5)); // 5
console.log(Math.abs(5)); // 5

// Min and Max
console.log(Math.min(1, 2, 3, 4, 5)); // 1
console.log(Math.max(1, 2, 3, 4, 5)); // 5

// ========== BIGINT ==========
console.log("\n=== BIGINT ===");

// Creating BigInt
const bigInt1 = 9007199254740991n;
const bigInt2 = BigInt(9007199254740991);
console.log(bigInt1); // 9007199254740991n
console.log(typeof bigInt1); // bigint

// BigInt operations
console.log(bigInt1 + 1n);
console.log(bigInt1 * 2n);
console.log(bigInt1 / 2n);

// Comparing BigInt
console.log(bigInt1 === 9007199254740991n); // true
console.log(bigInt1 === 9007199254740991); // false (different types)

// Maximum safe integer
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// ========== NUMBER FORMATTING ==========
console.log("\n=== NUMBER FORMATTING ===");

// toLocaleString()
const amount = 1234567.89;
console.log(amount.toLocaleString()); // "1,234,567.89"
console.log(amount.toLocaleString('en-US')); // "1,234,567.89"
console.log(amount.toLocaleString('de-DE')); // "1.234.567,89"

// Currency formatting
console.log(amount.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD' 
})); // "$1,234,567.89"

// Percentage formatting
console.log((0.75).toLocaleString('en-US', { 
    style: 'percent' 
})); // "75%"

// ========== INTELNUMBERFORMAT ==========
console.log("\n=== INTELNUMBERFORMAT ===");

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
console.log(formatter.format(1234.567)); // "$1,234.57"

// Custom formatting
const customFormatter = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'mile-per-hour',
    notation: 'compact'
});
console.log(customFormatter.format(100)); // "100 mph"

// ========== PERFORMANCE: MATH OPERATIONS ==========
console.log("\n=== PERFORMANCE: MATH OPERATIONS ===");

// Bitwise operators for performance
const num1 = 10;
const num2 = 3;

console.log(num1 << 1); // 20 (multiply by 2)
console.log(num1 >> 1); // 5 (divide by 2)

// Quick rounding with ~~
console.log(~~4.7); // 4
console.log(~~-4.7); // -4

// ========== COMPLEX MATH EXAMPLES ==========
console.log("\n=== COMPLEX MATH EXAMPLES ===");

// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10)); // 55

// Prime number check
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
console.log(isPrime(17)); // true
console.log(isPrime(15)); // false

// GCD (Greatest Common Divisor)
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}
console.log(gcd(48, 18)); // 6

// LCM (Least Common Multiple)
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}
console.log(lcm(12, 18)); // 36