// 34-modules.js - ES6 Modules

// ========== EXPORTING ==========
// This file demonstrates module exports and imports

// Named exports (individual)
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export class Calculator {
    static multiply(a, b) {
        return a * b;
    }
    
    static divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
}

// Named exports (grouped)
const utils = {
    square: (x) => x * x,
    cube: (x) => x * x * x,
    sqrt: (x) => Math.sqrt(x)
};

export { utils };

// Default export
export default function greet(name) {
    return `Hello, ${name}!`;
}

// Export with alias
export { PI as PIE, E as EULER };

// ========== IMPORTING ==========
// In a separate file, you would import like this:

/*
// Import default export
import greet from './math.js';

// Import named exports
import { add, subtract, Calculator } from './math.js';

// Import with alias
import { PI as PIE, E as EULER } from './math.js';

// Import all named exports as object
import * as math from './math.js';

// Import default and named together
import greet, { add, subtract } from './math.js';

// Dynamic import
const { default: greet, add } = await import('./math.js');
*/

// ========== RE-EXPORTING ==========
// Exporting from another module

/*
// Re-export all named exports
export * from './math.js';

// Re-export specific exports
export { add, subtract } from './math.js';

// Re-export with alias
export { add as sum, subtract as difference } from './math.js';
*/

// ========== MODULE SCOPE ==========
console.log("=== MODULE SCOPE ===");

// Variables in modules are scoped to the module
const moduleVariable = "I'm scoped to this module";
console.log(moduleVariable);

// This variable is not accessible globally
// In a browser, this would not be available on window

// ========== MODULE PATTERNS ==========
console.log("\n=== MODULE PATTERNS ===");

// 1. Revealing Module Pattern
const MyModule = (function() {
    // Private variables
    let count = 0;
    
    // Private functions
    function increment() {
        count++;
    }
    
    // Public API
    return {
        getCount() {
            return count;
        },
        incrementCount() {
            increment();
            return count;
        },
        reset() {
            count = 0;
            return count;
        }
    };
})();

console.log("Count:", MyModule.getCount());
MyModule.incrementCount();
console.log("Count after increment:", MyModule.getCount());

// 2. Module with singleton pattern
const SingletonModule = (function() {
    let instance;
    
    function createInstance() {
        return {
            id: Math.random(),
            data: []
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const instance1 = SingletonModule.getInstance();
const instance2 = SingletonModule.getInstance();
console.log("Same instance:", instance1 === instance2);

// ========== MODULE LOADING ==========
console.log("\n=== MODULE LOADING ===");

// Simulating module loading
function loadModule(moduleName) {
    console.log(`Loading module: ${moduleName}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: moduleName,
                exports: {
                    greet: (name) => `Hello from ${moduleName}, ${name}!`
                }
            });
        }, 1000);
    });
}

// Dynamic module loading
async function loadAndUseModule() {
    try {
        const module = await loadModule('greeting');
        console.log(module.exports.greet('John'));
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}

loadAndUseModule();

// ========== COMMONJS VS ES MODULES ==========
console.log("\n=== COMMONJS VS ES MODULES ===");

/*
// CommonJS (Node.js)
const fs = require('fs');
const path = require('path');

module.exports = {
    readFile: fs.readFile,
    writeFile: fs.writeFile
};

// ES Modules (modern)
import fs from 'fs';
import path from 'path';

export const readFile = fs.readFile;
export const writeFile = fs.writeFile;
*/

// ========== MODULE BEST PRACTICES ==========
console.log("\n=== MODULE BEST PRACTICES ===");

console.log("1. Use named exports for multiple exports");
console.log("2. Use default export for single main export");
console.log("3. Keep modules focused on a single responsibility");
console.log("4. Use clear and descriptive names");
console.log("5. Avoid circular dependencies");
console.log("6. Use import/export at the top level");
console.log("7. Use dynamic imports for code splitting");
console.log("8. Use import aliases for clarity");
console.log("9. Re-export modules for public APIs");
console.log("10. Use module bundlers for browser code");

// ========== REAL-WORLD MODULE EXAMPLE ==========
console.log("\n=== REAL-WORLD MODULE EXAMPLE ===");

// logger.js - Example module
/*
// logger.js
export const LogLevel = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};

export class Logger {
    constructor(level = LogLevel.INFO) {
        this.level = level;
    }
    
    log(message, level = LogLevel.INFO) {
        if (this.shouldLog(level)) {
            console.log(`[${level.toUpperCase()}] ${message}`);
        }
    }
    
    shouldLog(level) {
        const levels = Object.values(LogLevel);
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }
}

export default Logger;
*/

// app.js - Using the logger module
/*
import Logger, { LogLevel } from './logger.js';

const logger = new Logger(LogLevel.DEBUG);
logger.log('Application started', LogLevel.INFO);
logger.log('Debug information', LogLevel.DEBUG);
*/