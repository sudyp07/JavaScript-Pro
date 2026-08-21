// 25-dates.js - Working with dates and time

// ========== CREATING DATES ==========
console.log("=== CREATING DATES ===");

// Current date and time
const now = new Date();
console.log(now);

// Specific date (year, month, day, hour, minute, second)
const date1 = new Date(2024, 0, 15); // Jan 15, 2024
console.log(date1);

// Specific date with time
const date2 = new Date(2024, 0, 15, 10, 30, 45);
console.log(date2);

// From date string
const date3 = new Date("2024-01-15T10:30:45");
console.log(date3);

// From timestamp (milliseconds since Jan 1, 1970)
const date4 = new Date(1705319445000);
console.log(date4);

// ========== GET DATE COMPONENTS ==========
console.log("\n=== GET DATE COMPONENTS ===");

const date = new Date(2024, 0, 15, 10, 30, 45);

console.log(date.getFullYear()); // 2024
console.log(date.getMonth()); // 0 (January)
console.log(date.getDate()); // 15
console.log(date.getDay()); // 1 (Monday)
console.log(date.getHours()); // 10
console.log(date.getMinutes()); // 30
console.log(date.getSeconds()); // 45
console.log(date.getMilliseconds()); // 0

// UTC versions
console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDate());

// ========== SET DATE COMPONENTS ==========
console.log("\n=== SET DATE COMPONENTS ===");

const date5 = new Date();
date5.setFullYear(2025);
date5.setMonth(6); // July (0-indexed)
date5.setDate(20);
date5.setHours(15, 30, 0, 0);

console.log(date5);

// ========== DATE FORMATTING ==========
console.log("\n=== DATE FORMATTING ===");

const today = new Date();

// Built-in methods
console.log(today.toString());
console.log(today.toDateString());
console.log(today.toTimeString());
console.log(today.toISOString());
console.log(today.toUTCString());

// toLocaleString() with options
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
};
console.log(today.toLocaleString('en-US', options));
console.log(today.toLocaleString('fr-FR', options));
console.log(today.toLocaleString('ja-JP', options));

// ========== DATE COMPARISONS ==========
console.log("\n=== DATE COMPARISONS ===");

const date6 = new Date(2024, 0, 1);
const date7 = new Date(2024, 0, 15);

console.log(date6 < date7); // true
console.log(date6 > date7); // false
console.log(date6.getTime() === date7.getTime()); // false

// Difference in milliseconds
const diff = date7 - date6;
console.log(diff); // milliseconds

// Difference in days
const diffDays = diff / (1000 * 60 * 60 * 24);
console.log(diffDays);

// ========== DATE CALCULATIONS ==========
console.log("\n=== DATE CALCULATIONS ===");

// Add days
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
const current = new Date();
console.log(addDays(current, 7)); // 7 days from now
console.log(addDays(current, -7)); // 7 days ago

// Add months
function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}
console.log(addMonths(current, 3)); // 3 months from now

// ========== DATE COMPARISON FUNCTIONS ==========
console.log("\n=== DATE COMPARISON FUNCTIONS ===");

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}
console.log(isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 1))); // true
console.log(isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 2))); // false

function isInRange(date, start, end) {
    return date >= start && date <= end;
}
const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 31);
const check = new Date(2024, 0, 15);
console.log(isInRange(check, start, end)); // true

// ========== DATE PARSING ==========
console.log("\n=== DATE PARSING ===");

// Parse date string
const parsedDate = Date.parse("2024-01-15T10:30:00");
console.log(new Date(parsedDate));

// Manual parsing
function parseDate(str) {
    const parts = str.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}
console.log(parseDate("2024-01-15"));

// ========== TIME ZONES ==========
console.log("\n=== TIME ZONES ===");

// Getting timezone offset
console.log(current.getTimezoneOffset()); // minutes from UTC

// Working with UTC
const utcDate = new Date();
console.log(utcDate.toUTCString());

// Convert to specific timezone (formatting only)
console.log(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
console.log(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
console.log(utcDate.toLocaleString('en-US', { timeZone: 'Europe/London' }));

// ========== INTERNATIONAL DATE FORMAT ==========
console.log("\n=== INTERNATIONAL DATE FORMAT ===");

const intlDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
console.log(intlDate.format(today));

// Multiple locales
console.log(new Intl.DateTimeFormat('fr-FR').format(today));
console.log(new Intl.DateTimeFormat('ja-JP').format(today));
console.log(new Intl.DateTimeFormat('ar-EG').format(today));

// ========== RELATIVE TIME FORMAT ==========
console.log("\n=== RELATIVE TIME FORMAT ===");

const rtf = new Intl.RelativeTimeFormatter('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // yesterday
console.log(rtf.format(-2, 'day')); // 2 days ago
console.log(rtf.format(1, 'day')); // tomorrow
console.log(rtf.format(-5, 'month')); // 5 months ago

// ========== PERFORMANCE TIMING ==========
console.log("\n=== PERFORMANCE TIMING ===");

// Using Date for timing
const startTime = Date.now();

// Simulate work
for (let i = 0; i < 1000000; i++) {
    // Do nothing
}

const endTime = Date.now();
console.log(`Execution time: ${endTime - startTime}ms`);

// Using performance.now() (Node.js and browser)
if (typeof performance !== 'undefined') {
    const startPerf = performance.now();
    // Do work
    const endPerf = performance.now();
    console.log(`Performance: ${endPerf - startPerf}ms`);
}

// ========== DATE UTILITY FUNCTIONS ==========
console.log("\n=== DATE UTILITY FUNCTIONS ===");

// Get age from birthdate
function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
const birth = new Date(1990, 5, 15);
console.log(`Age: ${getAge(birth)}`);

// Get day of week
function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}
console.log(`Today is ${getDayName(today)}`);

// Get month name
function getMonthName(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
}
console.log(`Month: ${getMonthName(today)}`);

// Days in month
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
console.log(`Days in January 2024: ${getDaysInMonth(2024, 0)}`);

// ========== DATE VALIDATION ==========
console.log("\n=== DATE VALIDATION ===");

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}
console.log(isValidDate(new Date())); // true
console.log(isValidDate(new Date('invalid'))); // false

// Check if date is in the past
function isPastDate(date) {
    return date < new Date();
}
console.log(isPastDate(new Date(2023, 0, 1))); // true
console.log(isPastDate(new Date(2025, 0, 1))); // false

// Check if date is in the future
function isFutureDate(date) {
    return date > new Date();
}
console.log(isFutureDate(new Date(2025, 0, 1))); // true