// 36-proxies.js - Proxies and Reflect

// ========== BASIC PROXY ==========
console.log("=== BASIC PROXY ===");

const target = {
    message: "Hello",
    name: "John"
};

const handler = {
    get(target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message); // Gets message
proxy.name = "Jane"; // Sets name

// ========== PROPERTY VALIDATION ==========
console.log("\n=== PROPERTY VALIDATION ===");

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
        target[property] = value;
        return true;
    }
};

const personProxy = new Proxy({}, validator);
personProxy.name = "John";
personProxy.age = 25;
console.log(personProxy);

try {
    personProxy.age = "thirty"; // Error
} catch (error) {
    console.error("Error:", error.message);
}

try {
    personProxy.age = 200; // Error
} catch (error) {
    console.error("Error:", error.message);
}

// ========== ACCESS CONTROL ==========
console.log("\n=== ACCESS CONTROL ===");

const accessControl = {
    get(target, property) {
        if (property === 'password') {
            throw new Error('Access denied to password');
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === 'password' && value.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        target[property] = value;
        return true;
    },
    deleteProperty(target, property) {
        if (property === 'id') {
            throw new Error('Cannot delete id');
        }
        delete target[property];
        return true;
    }
};

const secureUser = new Proxy(
    { id: 1, username: "john_doe", password: "secret123" },
    accessControl
);

console.log(secureUser.username);
// console.log(secureUser.password); // Error

try {
    secureUser.password = "short"; // Error
} catch (error) {
    console.error("Error:", error.message);
}

try {
    delete secureUser.id; // Error
} catch (error) {
    console.error("Error:", error.message);
}

// ========== LOGGING AND DEBUGGING ==========
console.log("\n=== LOGGING AND DEBUGGING ===");

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

console.log(loggedObject.name);
loggedObject.age = 31;
console.log(loggedObject.greet("Alice"));

// ========== REVOCABLE PROXY ==========
console.log("\n=== REVOCABLE PROXY ===");

const { proxy: revocableProxy, revoke } = Proxy.revocable(
    { message: "Secret data" },
    {
        get(target, property) {
            console.log(`Accessing ${property}`);
            return target[property];
        }
    }
);

console.log(revocableProxy.message);
revoke();
// console.log(revocableProxy.message); // Error - proxy revoked

// ========== VIRTUAL PROPERTIES ==========
console.log("\n=== VIRTUAL PROPERTIES ===");

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

console.log(virtualPerson.fullName);
console.log(virtualPerson.ageInMonths);
console.log(virtualPerson.isAdult);

virtualPerson.fullName = "Jane Smith";
console.log(virtualPerson.firstName);
console.log(virtualPerson.lastName);

// ========== CACHING WITH PROXY ==========
console.log("\n=== CACHING WITH PROXY ===");

const cacheHandler = {
    get(target, property) {
        if (property in target) {
            console.log(`Cache hit: ${property}`);
            return target[property];
        }
        console.log(`Cache miss: ${property}`);
        const value = target[property] || `default for ${property}`;
        target[property] = value;
        return value;
    }
};

const cachedObject = new Proxy({}, cacheHandler);
console.log(cachedObject.name);
console.log(cachedObject.name); // Cache hit

// ========== REFLECT API ==========
console.log("\n=== REFLECT API ===");

const reflectTarget = {
    name: "John",
    age: 30
};

// Using Reflect methods
console.log("Has age:", Reflect.has(reflectTarget, 'age'));
console.log("Get name:", Reflect.get(reflectTarget, 'name'));
Reflect.set(reflectTarget, 'city', 'NYC');
console.log("Keys:", Reflect.ownKeys(reflectTarget));

// Reflect with proxies
const reflectHandler = {
    get(target, property, receiver) {
        console.log(`Getting ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        console.log(`Setting ${property} = ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

const reflectProxy = new Proxy(reflectTarget, reflectHandler);
console.log(reflectProxy.name);
reflectProxy.city = "LA";

// ========== PROPERTY OBSERVER ==========
console.log("\n=== PROPERTY OBSERVER ===");

function createObservable(target, onChange) {
    return new Proxy(target, {
        set(target, property, value) {
            const oldValue = target[property];
            target[property] = value;
            if (oldValue !== value) {
                onChange(property, oldValue, value);
            }
            return true;
        }
    });
}

const observable = createObservable(
    { name: "John", age: 25 },
    (property, oldValue, newValue) => {
        console.log(`Property ${property} changed from ${oldValue} to ${newValue}`);
    }
);

observable.name = "Jane";
observable.age = 26;

// ========== PROXY PERFORMANCE ==========
console.log("\n=== PROXY PERFORMANCE ===");

console.log("Proxies have a performance overhead");
console.log("Use them judiciously for debugging or specific use cases");
console.log("Avoid using proxies in performance-critical code paths");

// ========== PROXY USE CASES ==========
console.log("\n=== PROXY USE CASES ===");

console.log("1. Property validation");
console.log("2. Access control and security");
console.log("3. Logging and debugging");
console.log("4. Virtual properties");
console.log("5. Caching");
console.log("6. Observers and event handling");
console.log("7. Immutable objects");
console.log("8. Proxy patterns in frameworks (Vue.js, MobX)");
console.log("9. API mocking");
console.log("10. Lazy loading");