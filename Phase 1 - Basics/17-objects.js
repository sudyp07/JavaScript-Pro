// 17-objects.js - Working with objects in JavaScript

// Creating objects
let emptyObject = {};
let person = {
    name: "John",
    age: 25,
    city: "NYC"
};

// Object with methods
let user = {
    name: "Alice",
    age: 30,
    greet: function() {
        console.log(`Hello, I'm ${this.name}`);
    },
    // ES6 shorthand method
    sayAge() {
        console.log(`I am ${this.age} years old`);
    }
};
user.greet();
user.sayAge();

// Accessing properties
console.log(person.name); // Dot notation
console.log(person["age"]); // Bracket notation
let key = "city";
console.log(person[key]); // Dynamic property

// Modifying properties
person.age = 26;
person["city"] = "LA";
console.log(person);

// Adding new properties
person.email = "john@example.com";
person["phone"] = "123-456-7890";
console.log(person);

// Deleting properties
delete person.phone;
console.log(person);

// Checking if property exists
console.log("name" in person); // true
console.log("phone" in person); // false
console.log(person.hasOwnProperty("age")); // true

// Object methods
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020
};
// Get keys
console.log(Object.keys(car)); // ["brand", "model", "year"]
// Get values
console.log(Object.values(car)); // ["Toyota", "Camry", 2020]
// Get entries
console.log(Object.entries(car)); // [["brand", "Toyota"], ["model", "Camry"], ["year", 2020]]

// Iterating over objects
for (let key in car) {
    console.log(`${key}: ${car[key]}`);
}

// Object destructuring
let { name, age } = person;
console.log(name, age); // John 26

// With different variable names
let { name: firstName, city: location } = person;
console.log(firstName, location); // John LA

// Default values in destructuring
let { country = "USA" } = person;
console.log(country); // USA

// Nested objects
let student = {
    name: "Bob",
    grades: {
        math: 90,
        science: 85,
        english: 88
    },
    address: {
        street: "123 Main St",
        city: "Boston",
        zip: "02101"
    }
};
console.log(student.grades.math); // 90
console.log(student.address.city); // Boston

// Nested destructuring
let { grades: { math, science }, address: { city: studentCity } } = student;
console.log(math, science, studentCity); // 90 85 Boston

// Object spread operator
let personCopy = { ...person };
console.log(personCopy);

// Merging objects
let info1 = { name: "John", age: 25 };
let info2 = { city: "NYC", country: "USA" };
let merged = { ...info1, ...info2 };
console.log(merged);

// Object.assign
let anotherCopy = Object.assign({}, person);
console.log(anotherCopy);

// Constructor functions
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log(`Hi, I'm ${this.name}`);
    };
}
let john = new Person("John", 25);
john.greet();

// Class syntax (ES6)
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }
    makeSound() {
        console.log(`${this.name} says ${this.sound}`);
    }
}
let dog = new Animal("Dog", "Woof");
dog.makeSound();

// Objects with computed property names
let propName = "score";
let game = {
    [propName]: 100,
    ["player" + "Name"]: "Alice"
};
console.log(game.score); // 100
console.log(game.playerName); // Alice

// Freezing objects (cannot be modified)
let frozen = Object.freeze({ value: 10 });
// frozen.value = 20; // Error in strict mode
console.log(frozen.value); // 10

// Sealing objects (can modify existing, cannot add/delete)
let sealed = Object.seal({ value: 10 });
sealed.value = 20; // Works
// sealed.newProp = 30; // Error in strict mode
console.log(sealed.value); // 20