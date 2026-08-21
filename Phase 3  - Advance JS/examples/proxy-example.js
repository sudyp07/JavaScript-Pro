// examples/proxy-example.js - Proxy Pattern Examples

// ========== BASIC PROXY ==========
console.log("=== BASIC PROXY ===");

const target = {
    name: "John",
    age: 25,
    city: "NYC"
};

const handler = {
    get(target, property) {
        console.log(`[GET] ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`[SET] ${property} = ${value}`);
        target[property] = value;
        return true;
    },
    deleteProperty(target, property) {
        console.log(`[DELETE] ${property}`);
        delete target[property];
        return true;
    },
    has(target, property) {
        console.log(`[HAS] ${property}`);
        return property in target;
    },
    ownKeys(target) {
        console.log('[OWN_KEYS]');
        return Object.keys(target);
    }
};

const proxy = new Proxy(target, handler);

console.log("Get name:", proxy.name);
proxy.age = 30;
console.log("Has city:", 'city' in proxy);
console.log("Own keys:", Object.keys(proxy));
delete proxy.city;
console.log("After delete:", proxy);

// ========== VALIDATION PROXY ==========
console.log("\n=== VALIDATION PROXY ===");

const validator = {
    set(target, property, value) {
        if (property === 'age') {
            if (typeof value !== 'number') {
                throw new TypeError('Age must be a number');
            }
            if (value < 0 || value > 150) {
                throw new RangeError('Age must be between 0 and 150');
            }
        }
        if (property === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                throw new Error('Invalid email format');
            }
        }
        if (property === 'password') {
            if (value.length < 8) {
                throw new Error('Password must be at least 8 characters');
            }
        }
        target[property] = value;
        return true;
    },
    get(target, property) {
        if (property === 'password') {
            throw new Error('Access denied to password');
        }
        return target[property];
    }
};

const user = new Proxy({}, validator);

try {
    user.name = "John";
    user.age = 25;
    user.email = "john@example.com";
    user.password = "secure_password";
    console.log("User:", user.name, user.age, user.email);
    // console.log(user.password); // Error
} catch (error) {
    console.error("Validation error:", error.message);
}

// ========== ACCESS CONTROL PROXY ==========
console.log("\n=== ACCESS CONTROL PROXY ===");

const accessControl = {
    get(target, property) {
        if (property === 'admin') {
            throw new Error('Access denied to admin');
        }
        if (property === 'secret') {
            throw new Error('Access denied to secret');
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === 'role' && value === 'admin') {
            throw new Error('Cannot set role to admin');
        }
        target[property] = value;
        return true;
    }
};

const secureObj = new Proxy(
    { user: 'john', role: 'user', admin: true, secret: 'hidden' },
    accessControl
);

try {
    console.log("User:", secureObj.user);
    // console.log("Admin:", secureObj.admin); // Error
    secureObj.role = 'editor';
    console.log("Role:", secureObj.role);
    // secureObj.role = 'admin'; // Error
} catch (error) {
    console.error("Access error:", error.message);
}

// ========== LOGGING PROXY ==========
console.log("\n=== LOGGING PROXY ===");

const loggingHandler = {
    get(target, property) {
        console.log(`[${new Date().toISOString()}] GET: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`[${new Date().toISOString()}] SET: ${property} = ${value}`);
        target[property] = value;
        return true;
    },
    apply(target, thisArg, args) {
        console.log(`[${new Date().toISOString()}] CALL: ${target.name}(${args.join(', ')})`);
        return target.apply(thisArg, args);
    }
};

const loggedObject = new Proxy(
    {
        name: "John",
        age: 30,
        greet(name) {
            return `Hello, ${name}!`;
        }
    },
    loggingHandler
);

console.log("Name:", loggedObject.name);
loggedObject.age = 31;
console.log("Greet:", loggedObject.greet("Alice"));

// ========== CACHING PROXY ==========
console.log("\n=== CACHING PROXY ===");

const cacheHandler = {
    get(target, property) {
        if (property in target) {
            console.log(`[CACHE HIT] ${property}`);
            return target[property];
        }
        console.log(`[CACHE MISS] ${property}`);
        const value = target[property] || `default for ${property}`;
        target[property] = value;
        return value;
    }
};

const cachedObject = new Proxy({}, cacheHandler);
console.log("First access:", cachedObject.name);
console.log("Second access:", cachedObject.name);
console.log("First access:", cachedObject.age);
console.log("Second access:", cachedObject.age);

// ========== VIRTUAL PROPERTIES PROXY ==========
console.log("\n=== VIRTUAL PROPERTIES PROXY ===");

const virtualHandler = {
    get(target, property) {
        if (property === 'fullName') {
            return `${target.firstName} ${target.lastName}`;
        }
        if (property === 'ageInMonths') {
            return target.age * 12;
        }
        if (property === 'isAdult') {
            return target.age >= 18;
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === 'fullName') {
            const [firstName, lastName] = value.split(' ');
            target.firstName = firstName;
            target.lastName = lastName;
            return true;
        }
        target[property] = value;
        return true;
    }
};

const virtualPerson = new Proxy(
    { firstName: "John", lastName: "Doe", age: 25 },
    virtualHandler
);

console.log("Full name:", virtualPerson.fullName);
console.log("Age in months:", virtualPerson.ageInMonths);
console.log("Is adult:", virtualPerson.isAdult);

virtualPerson.fullName = "Jane Smith";
console.log("Updated:", virtualPerson.firstName, virtualPerson.lastName);

// ========== REVOCABLE PROXY ==========
console.log("\n=== REVOCABLE PROXY ===");

const { proxy: revocableProxy, revoke } = Proxy.revocable(
    { message: "Secret data", name: "John" },
    {
        get(target, property) {
            console.log(`[REVOCABLE] Accessing ${property}`);
            return target[property];
        }
    }
);

console.log("Before revoke:", revocableProxy.message);
revoke();

try {
    console.log("After revoke:", revocableProxy.message);
} catch (error) {
    console.error("After revoke - error:", error.message);
}

// ========== PROXY IN REAL-WORLD SCENARIOS ==========
console.log("\n=== PROXY IN REAL-WORLD SCENARIOS ===");

// API Client with proxy
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.cache = new Map();
        
        return new Proxy(this, {
            get(target, property) {
                if (property in target) {
                    return target[property];
                }
                
                return async function(...args) {
                    const endpoint = property;
                    const params = args[0] || {};
                    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
                    
                    if (target.cache.has(cacheKey)) {
                        console.log(`[CACHE] Returning cached result for ${endpoint}`);
                        return target.cache.get(cacheKey);
                    }
                    
                    console.log(`[API] Fetching ${endpoint} with`, params);
                    const result = await target.fetch(endpoint, params);
                    target.cache.set(cacheKey, result);
                    return result;
                };
            }
        });
    }
    
    async fetch(endpoint, params) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    endpoint,
                    params,
                    data: { id: 1, name: "John", timestamp: Date.now() }
                });
            }, 500);
        });
    }
}

const api = new APIClient('https://api.example.com');

async function testAPI() {
    console.log("First call:", await api.users({ id: 1 }));
    console.log("Second call (cached):", await api.users({ id: 1 }));
    console.log("Different params:", await api.users({ id: 2 }));
}

testAPI();

// ========== PERFORMANCE CONSIDERATIONS ==========
console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

console.log("Proxies have performance overhead");
console.log("Use proxies judiciously for:");
console.log("1. Validation and sanitization");
console.log("2. Access control and security");
console.log("3. Logging and debugging");
console.log("4. Virtual properties");
console.log("5. Caching");
console.log("6. Observers and event handling");
console.log("7. API mocking");
console.log("8. Lazy loading");
console.log("9. Property observation");
console.log("10. Framework internals (Vue.js, MobX)");

console.log("\n✅ Proxy examples completed!");