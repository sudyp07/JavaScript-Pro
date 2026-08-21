// 22-objects-advanced.js - Advanced object manipulation and operations

// ========== OBJECT DESTRUCTURING ==========
console.log("=== OBJECT DESTRUCTURING ===");

// Basic destructuring
const person = {
    name: "John",
    age: 30,
    city: "NYC",
    country: "USA"
};
const { name, age, city } = person;
console.log(name, age, city); // John 30 NYC

// Destructuring with different variable names
const { name: firstName, age: years } = person;
console.log(firstName, years); // John 30

// Default values
const { country = "Unknown", state = "Unknown" } = person;
console.log(country, state); // USA Unknown

// Nested destructuring
const user = {
    id: 1,
    profile: {
        username: "john_doe",
        email: "john@example.com",
        address: {
            street: "123 Main St",
            city: "NYC"
        }
    }
};
const { 
    profile: { 
        username, 
        email,
        address: { street, city: userCity } 
    } 
} = user;
console.log(username, email, street, userCity);

// ========== COMPUTED PROPERTY NAMES ==========
console.log("\n=== COMPUTED PROPERTY NAMES ===");

const keyName = "firstName";
const keyValue = "John";
const obj = {
    [keyName]: keyValue,
    ["user" + "Age"]: 30,
    [`user_${keyName}`]: keyValue
};
console.log(obj); // {firstName: "John", userAge: 30, user_firstName: "John"}

// ========== OBJECT METHODS ==========
console.log("\n=== OBJECT METHODS ===");

// Object.keys()
const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city', 'country']

// Object.values()
const values = Object.values(person);
console.log(values); // ['John', 30, 'NYC', 'USA']

// Object.entries()
const entries = Object.entries(person);
console.log(entries);
// [['name', 'John'], ['age', 30], ['city', 'NYC'], ['country', 'USA']]

// Iterating over entries
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// ========== OBJECT ASSIGN ==========
console.log("\n=== OBJECT ASSIGN ===");

// Merging objects
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const mergedObj = Object.assign({}, target, source);
console.log(mergedObj); // {a: 1, b: 3, c: 4}

// Clone object
const clone = Object.assign({}, person);
console.log(clone);

// ========== OBJECT FREEZE ==========
console.log("\n=== OBJECT FREEZE ===");

const frozenObj = { name: "Frozen", value: 10 };
Object.freeze(frozenObj);

// Trying to modify (fails silently or error in strict mode)
frozenObj.name = "Changed"; // Won't work
frozenObj.newProp = "new"; // Won't work
delete frozenObj.value; // Won't work
console.log(frozenObj); // {name: "Frozen", value: 10}

console.log(Object.isFrozen(frozenObj)); // true

// ========== OBJECT SEAL ==========
console.log("\n=== OBJECT SEAL ===");

const sealedObj = { name: "Sealed", value: 10 };
Object.seal(sealedObj);

// Can modify existing properties
sealedObj.value = 20;
console.log(sealedObj); // {name: "Sealed", value: 20}

// Cannot add or delete properties
sealedObj.newProp = "new"; // Won't work
delete sealedObj.name; // Won't work
console.log(sealedObj); // {name: "Sealed", value: 20}

console.log(Object.isSealed(sealedObj)); // true

// ========== OBJECT PROPERTY DESCRIPTORS ==========
console.log("\n=== OBJECT PROPERTY DESCRIPTORS ===");

const descriptorObj = {};
Object.defineProperty(descriptorObj, "readOnly", {
    value: 42,
    writable: false,
    enumerable: true,
    configurable: false
});

// Trying to modify
descriptorObj.readOnly = 100; // Won't work (fails silently)
console.log(descriptorObj.readOnly); // 42

// Getting property descriptor
const descriptor = Object.getOwnPropertyDescriptor(descriptorObj, "readOnly");
console.log(descriptor);
// {value: 42, writable: false, enumerable: true, configurable: false}

// Multiple properties
Object.defineProperties(descriptorObj, {
    prop1: {
        value: "Property 1",
        writable: true,
        enumerable: true
    },
    prop2: {
        value: "Property 2",
        writable: false,
        enumerable: false
    }
});
console.log(descriptorObj);

// ========== GETTERS AND SETTERS ==========
console.log("\n=== GETTERS AND SETTERS ===");

const bankAccount = {
    _balance: 0,
    get balance() {
        return `$${this._balance}`;
    },
    set balance(amount) {
        if (amount >= 0) {
            this._balance = amount;
        } else {
            console.log("Invalid amount");
        }
    }
};
bankAccount.balance = 1000;
console.log(bankAccount.balance); // $1000
bankAccount.balance = -500; // Invalid amount

// ========== PROTOTYPES AND INHERITANCE ==========
console.log("\n=== PROTOTYPES AND INHERITANCE ===");

// Creating object with prototype
const animal = {
    speak() {
        console.log(`${this.name} makes a sound`);
    }
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() {
    console.log(`${this.name} barks`);
};
dog.speak(); // Rex makes a sound
dog.bark(); // Rex barks

// Constructor function with prototype
function Vehicle(type) {
    this.type = type;
}
Vehicle.prototype.getType = function() {
    return this.type;
};

const car = new Vehicle("Car");
console.log(car.getType()); // Car

// Class inheritance (ES6)
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    speak() {
        console.log(`${this.name} barks`);
    }
    getBreed() {
        return this.breed;
    }
}

const rex = new Dog("Rex", "German Shepherd");
rex.speak(); // Rex barks
console.log(rex.getBreed()); // German Shepherd

// ========== OBJECT SPREAD ==========
console.log("\n=== OBJECT SPREAD ===");

// Copying object
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // {a: 1, b: 2}

// Merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedSpread = { ...obj1, ...obj2 };
console.log(mergedSpread); // {a: 1, b: 2, c: 3, d: 4}

// Overriding properties
const obj3 = { a: 1, b: 2 };
const obj4 = { b: 3, c: 4 };
const overridden = { ...obj3, ...obj4 };
console.log(overridden); // {a: 1, b: 3, c: 4}

// ========== HAS OWN PROPERTY ==========
console.log("\n=== HAS OWN PROPERTY ===");

const objWithProto = Object.create({ inherited: "value" });
objWithProto.own = "own value";

console.log(objWithProto.hasOwnProperty("own")); // true
console.log(objWithProto.hasOwnProperty("inherited")); // false

// Modern way using Object.hasOwn()
console.log(Object.hasOwn(objWithProto, "own")); // true
console.log(Object.hasOwn(objWithProto, "inherited")); // false

// ========== IN OPERATOR ==========
console.log("\n=== IN OPERATOR ===");

console.log("name" in person); // true
console.log("age" in person); // true
console.log("phone" in person); // false

// ========== OBJECT TO PRIMITIVE ==========
console.log("\n=== OBJECT TO PRIMITIVE ===");

const customObj = {
    value: 42,
    toString() {
        return `Value: ${this.value}`;
    },
    valueOf() {
        return this.value;
    }
};

console.log(String(customObj)); // Value: 42
console.log(Number(customObj)); // 42
console.log(customObj + 10); // 52 (uses valueOf)

// ========== SHALLOW VS DEEP COPY ==========
console.log("\n=== SHALLOW VS DEEP COPY ===");

// Shallow copy
const nested = {
    a: 1,
    b: { c: 2, d: 3 }
};
const shallowCopy = { ...nested };
shallowCopy.b.c = 10;
console.log(nested.b.c); // 10 (changed in original too)

// Deep copy with JSON
const deepCopy = JSON.parse(JSON.stringify(nested));
deepCopy.b.c = 20;
console.log(nested.b.c); // 10 (unchanged)
console.log(deepCopy.b.c); // 20