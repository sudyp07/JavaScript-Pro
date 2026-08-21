// examples/module-example.js - Example of using ES6 modules

// ========== IMPORTING FROM MODULES ==========

// Import default export
import greet from './module-example.js';

// Import named exports
import { 
    PI, 
    E, 
    add, 
    subtract, 
    Calculator,
    utils,
    PIE,
    EULER
} from './module-example.js';

// Import all as namespace
import * as math from './module-example.js';

// Import with alias
import greetUser from './module-example.js';

// ========== USING IMPORTED MODULES ==========

console.log("=== MODULE EXAMPLE ===");

// Using default export
console.log(greet("John"));

// Using named exports
console.log("PI:", PI);
console.log("E:", E);
console.log("Add:", add(5, 3));
console.log("Subtract:", subtract(10, 4));

// Using class
const calc = new Calculator();
console.log("Multiply:", calc.multiply(6, 7));
console.log("Divide:", calc.divide(15, 3));

// Using utility exports
console.log("Square:", utils.square(5));
console.log("Cube:", utils.cube(3));
console.log("Square root:", utils.sqrt(16));

// Using aliases
console.log("PIE (alias for PI):", PIE);
console.log("EULER (alias for E):", EULER);

// Using namespace import
console.log("Math namespace - PI:", math.PI);
console.log("Math namespace - add:", math.add(7, 3));

// ========== DYNAMIC IMPORTS ==========

async function loadModuleDynamically() {
    console.log("\n=== DYNAMIC IMPORT ===");
    
    try {
        // Dynamic import
        const module = await import('./module-example.js');
        console.log("Dynamically imported:", module.default("Alice"));
        console.log("Dynamic PI:", module.PI);
    } catch (error) {
        console.error("Failed to load module:", error);
    }
}

// Uncomment to test dynamic import
// loadModuleDynamically();

// ========== RE-EXPORTING MODULES ==========

// If you have index.js that re-exports:
/*
// index.js
export * from './module-example.js';
export { default as greet } from './module-example.js';
*/

// ========== COMMONJS VS ES MODULES ==========

console.log("\n=== COMMONJS VS ES MODULES ===");

console.log("ES Modules (import/export):");
console.log("  import { add } from './math.js';");
console.log("  export const PI = 3.14159;");
console.log("  export default function() {}");

console.log("\nCommonJS (require/module.exports):");
console.log("  const { add } = require('./math.js');");
console.log("  module.exports = { PI: 3.14159 };");
console.log("  module.exports = function() {};");

// ========== MODULE PATTERNS ==========

console.log("\n=== MODULE PATTERNS ===");

// Pattern 1: Export multiple named exports
export const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
};

export function fetchData(endpoint) {
    return fetch(`${config.apiUrl}/${endpoint}`);
}

// Pattern 2: Export default object
const logger = {
    info: (msg) => console.log(`[INFO] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`)
};
export default logger;

// Pattern 3: Export class
export class DataService {
    constructor() {
        this.data = [];
    }
    
    add(item) {
        this.data.push(item);
        return this;
    }
    
    get() {
        return this.data;
    }
    
    clear() {
        this.data = [];
        return this;
    }
}

// Pattern 4: Export function factory
export function createService(config) {
    return {
        config,
        fetch(endpoint) {
            console.log(`Fetching from ${config.baseUrl}/${endpoint}`);
            return Promise.resolve({ data: [] });
        }
    };
}

// ========== MODULE SCOPING ==========

console.log("\n=== MODULE SCOPING ===");

// Variables declared in modules are scoped to the module
const moduleScopedVariable = "I am only available in this module";
console.log("Module scoped:", moduleScopedVariable);

// Not accessible globally (in browser, not on window)
// window.moduleScopedVariable // undefined

// ========== MODULE LOADING EXAMPLES ==========

console.log("\n=== MODULE LOADING EXAMPLES ===");

// Example of using import.meta
console.log("Module URL:", import.meta.url);

// Module import attributes (for JSON modules)
/*
import data from './data.json' assert { type: 'json' };
console.log(data);
*/

// ========== MODULE BEST PRACTICES ==========

console.log("\n=== MODULE BEST PRACTICES ===");

console.log("1. Use one default export per module");
console.log("2. Use named exports for multiple exports");
console.log("3. Keep modules focused and small");
console.log("4. Avoid circular dependencies");
console.log("5. Use clear and descriptive names");
console.log("6. Export what you use, use what you export");
console.log("7. Use dynamic imports for code splitting");
console.log("8. Use import aliases for clarity");
console.log("9. Re-export modules for public APIs");
console.log("10. Use module bundlers for browser code");

console.log("\n✅ Module example completed!");