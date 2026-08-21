// 40-performance.js - Performance Optimization

// ========== PERFORMANCE MEASUREMENT ==========
console.log("=== PERFORMANCE MEASUREMENT ===");

// Using performance.now()
function measureExecution(fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`Execution time: ${(end - start).toFixed(2)}ms`);
    return result;
}

measureExecution(() => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    return sum;
});

// Using console.time()
console.time("Operation");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}
console.timeEnd("Operation");

// ========== MEMORY MANAGEMENT ==========
console.log("\n=== MEMORY MANAGEMENT ===");

// Memory leak example (don't do this)
function createMemoryLeak() {
    const largeArray = new Array(1000000).fill("data");
    global.leakyArray = largeArray; // Prevents garbage collection
}

// Avoid memory leaks
function createMemorySafe() {
    const largeArray = new Array(1000000).fill("data");
    return largeArray; // Can be garbage collected when not referenced
}

// Using WeakMap to prevent memory leaks
class CacheManager {
    constructor() {
        this.cache = new WeakMap();
    }
    
    set(key, value) {
        this.cache.set(key, value);
    }
    
    get(key) {
        return this.cache.get(key);
    }
}

const cache = new CacheManager();
const obj = { id: 1 };
cache.set(obj, "Cached data");
console.log(cache.get(obj));

// ========== DEBOUNCING ==========
console.log("\n=== DEBOUNCING ===");

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const debouncedLog = debounce((message) => {
    console.log("Debounced:", message);
}, 1000);

debouncedLog("Hello");
debouncedLog("World");
debouncedLog("Test"); // Only this will execute after 1 second

// ========== THROTTLING ==========
console.log("\n=== THROTTLING ===");

function throttle(fn, limit) {
    let inThrottle = false;
    let lastResult;
    
    return function(...args) {
        if (!inThrottle) {
            lastResult = fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
        return lastResult;
    };
}

const throttledLog = throttle((message) => {
    console.log("Throttled:", message);
}, 1000);

setInterval(() => {
    throttledLog("Hello");
}, 100);

// ========== LAZY LOADING ==========
console.log("\n=== LAZY LOADING ===");

class LazyLoader {
    constructor(loader) {
        this.loader = loader;
        this._value = null;
        this._loaded = false;
    }
    
    get value() {
        if (!this._loaded) {
            this._value = this.loader();
            this._loaded = true;
        }
        return this._value;
    }
}

const expensiveData = new LazyLoader(() => {
    console.log("Loading expensive data...");
    return Array.from({ length: 1000 }, (_, i) => i * i);
});

console.log("Data not loaded yet");
console.log("Loading:", expensiveData.value);
console.log("Cached:", expensiveData.value);

// ========== CODE SPLITTING ==========
console.log("\n=== CODE SPLITTING ===");

// Simulating dynamic imports
async function loadModule(moduleName) {
    console.log(`Loading module: ${moduleName}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                greet: (name) => `Hello from ${moduleName}, ${name}!`
            });
        }, 1000);
    });
}

async function useModule() {
    const module = await loadModule('greeting');
    console.log(module.greet('John'));
}

// Only load when needed
document.addEventListener('click', () => {
    useModule();
});

// ========== CACHING STRATEGIES ==========
console.log("\n=== CACHING STRATEGIES ===");

class Cache {
    constructor(ttl = 60000) {
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return entry.value;
    }
    
    clear() {
        this.cache.clear();
    }
}

const cache2 = new Cache(5000);
cache2.set("data", { name: "John" });
console.log("Cached data:", cache2.get("data"));

// ========== OPTIMIZATION TECHNIQUES ==========
console.log("\n=== OPTIMIZATION TECHNIQUES ===");

// 1. Use appropriate data structures
console.log("1. Choose right data structures");
const array = [];
const set = new Set();

// 2. Avoid unnecessary object creation
function createUser(name, age) {
    return { name, age }; // Good
}

// 3. Use const for immutable references
const config = { api: "https://api.example.com" }; // Good

// 4. Use let for mutable references
let counter2 = 0; // Good

// 5. Use strict equality
console.log("5. Use === instead of ==");

// 6. Cache DOM references
const element = document.getElementById('myElement'); // Good

// 7. Use event delegation
// document.addEventListener('click', handleClick) // Good

// 8. Minimize DOM updates
// Use document fragments or batch updates

// 9. Use requestAnimationFrame for animations
function animate() {
    // Animation code
    requestAnimationFrame(animate);
}

// 10. Use Web Workers for CPU-intensive tasks
// Create worker for heavy calculations

// ========== PERFORMANCE BEST PRACTICES ==========
console.log("\n=== PERFORMANCE BEST PRACTICES ===");

console.log("1. Profile before optimizing");
console.log("2. Use performance.now() for measurements");
console.log("3. Avoid memory leaks");
console.log("4. Use debouncing and throttling");
console.log("5. Implement lazy loading");
console.log("6. Split code into chunks");
console.log("7. Cache expensive operations");
console.log("8. Use appropriate data structures");
console.log("9. Optimize loops and iterations");
console.log("10. Minimize DOM manipulation");
console.log("11. Use requestAnimationFrame");
console.log("12. Avoid unnecessary re-renders");
console.log("13. Use compression (gzip)");
console.log("14. Optimize images and assets");
console.log("15. Use CDN for static assets");

// ========== MEMORY PROFILING ==========
console.log("\n=== MEMORY PROFILING ===");

// Simulating memory usage
function simulateMemoryUsage() {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({ id: i, value: "x".repeat(1000) });
    }
    return data;
}

// In Node.js: node --inspect-brk file.js
// Then use Chrome DevTools for memory profiling

console.log("Memory profiling example");
console.log("Open Chrome DevTools -> Memory tab -> Take heap snapshot");
console.log("Analyze memory usage and identify leaks");

// ========== PERFORMANCE TIPS ==========
console.log("\n=== PERFORMANCE TIPS ===");

console.log("Tip 1: Use Map/Set for frequent lookups");
const map = new Map();
const set2 = new Set();

console.log("Tip 2: Use array methods carefully");
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);
console.log("Using for loop vs forEach vs map");

console.log("Tip 3: Avoid using eval()");
console.log("Tip 4: Use try/catch sparingly");
console.log("Tip 5: Use const for immutable values");
console.log("Tip 6: Use let for mutable values");
console.log("Tip 7: Use arrow functions for callbacks");
console.log("Tip 8: Use template literals");
console.log("Tip 9: Use destructuring");
console.log("Tip 10: Use spread operator");