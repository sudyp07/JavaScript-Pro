// 32-classes-oop.js - Classes and Object-Oriented Programming

// ========== BASIC CLASS ==========
console.log("=== BASIC CLASS ===");

class Person {
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Method
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old`;
    }

    // Getter
    get isAdult() {
        return this.age >= 18;
    }

    // Setter
    set birthYear(year) {
        this.age = new Date().getFullYear() - year;
    }

    // Static method
    static createAnonymous() {
        return new Person("Anonymous", 0);
    }
}

// Instance creation
const john = new Person("John", 25);
console.log(john.greet());
console.log("Is adult:", john.isAdult);

// Static method
const anonymous = Person.createAnonymous();
console.log(anonymous.greet());

// ========== INHERITANCE ==========
console.log("\n=== INHERITANCE ===");

class Employee extends Person {
    constructor(name, age, employeeId, department) {
        super(name, age); // Call parent constructor
        this.employeeId = employeeId;
        this.department = department;
        this._salary = 0; // Private convention
    }

    // Override method
    greet() {
        return `${super.greet()} and I work in ${this.department}`;
    }

    // New method
    work() {
        return `${this.name} is working in ${this.department}`;
    }

    // Getter
    get salary() {
        return this._salary;
    }

    // Setter with validation
    set salary(value) {
        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }
        this._salary = value;
    }

    // Static method
    static createManager(name, age, employeeId) {
        return new Employee(name, age, employeeId, "Management");
    }
}

const emp = new Employee("Alice", 30, "EMP001", "Engineering");
emp.salary = 75000;
console.log(emp.greet());
console.log(emp.work());
console.log("Salary:", emp.salary);

const manager = Employee.createManager("Bob", 35, "EMP002");
console.log(manager.greet());

// ========== PRIVATE FIELDS ==========
console.log("\n=== PRIVATE FIELDS ===");

class BankAccount {
    #balance = 0; // Private field
    #accountNumber; // Private field

    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.owner = "Unknown"; // Public field
    }

    // Public method
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Amount must be positive");
        }
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            throw new Error("Insufficient funds");
        }
        this.#balance -= amount;
        return this.#balance;
    }

    // Private method (convention)
    #validateTransaction(amount) {
        return amount > 0 && amount <= this.#balance;
    }

    get balance() {
        return this.#balance;
    }

    get accountNumber() {
        return this.#accountNumber;
    }
}

const account = new BankAccount("12345", 1000);
console.log("Balance:", account.balance);
// console.log(account.#balance); // Error - private field
account.deposit(500);
console.log("New balance:", account.balance);

// ========== STATIC PROPERTIES AND METHODS ==========
console.log("\n=== STATIC PROPERTIES AND METHODS ===");

class MathUtils {
    static PI = 3.14159;
    static E = 2.71828;

    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
}

console.log("PI:", MathUtils.PI);
console.log("Add:", MathUtils.add(5, 3));
console.log("Factorial 5:", MathUtils.factorial(5));

// ========== GETTERS AND SETTERS ==========
console.log("\n=== GETTERS AND SETTERS ===");

class Temperature {
    constructor(celsius) {
        this._celsius = celsius;
    }

    get celsius() {
        return this._celsius;
    }

    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Temperature below absolute zero");
        }
        this._celsius = value;
    }

    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }

    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }

    get kelvin() {
        return this._celsius + 273.15;
    }

    set kelvin(value) {
        this.celsius = value - 273.15;
    }
}

const temp = new Temperature(25);
console.log("Celsius:", temp.celsius);
console.log("Fahrenheit:", temp.fahrenheit);
console.log("Kelvin:", temp.kelvin);

temp.fahrenheit = 98.6;
console.log("New Celsius:", temp.celsius);

// ========== POLYMORPHISM ==========
console.log("\n=== POLYMORPHISM ===");

class Shape {
    area() {
        return 0;
    }

    perimeter() {
        return 0;
    }

    describe() {
        return `I am a shape with area ${this.area()} and perimeter ${this.perimeter()}`;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }

    perimeter() {
        return 2 * Math.PI * this.radius;
    }

    describe() {
        return `I am a circle with radius ${this.radius}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Triangle extends Shape {
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }

    area() {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    perimeter() {
        return this.a + this.b + this.c;
    }
}

// Polymorphic array
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
];

shapes.forEach(shape => {
    console.log(shape.describe());
    console.log(`Area: ${shape.area().toFixed(2)}`);
    console.log(`Perimeter: ${shape.perimeter().toFixed(2)}`);
    console.log("---");
});

// ========== MIXINS ==========
console.log("\n=== MIXINS ===");

// Mixin functions
const LoggerMixin = {
    log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    },
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
};

const ValidationMixin = {
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }
};

// Apply mixins
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

// Apply mixins to class
Object.assign(User.prototype, LoggerMixin, ValidationMixin);

const user = new User("John", "john@example.com");
user.log("User created");
console.log("Valid email:", user.validateEmail(user.email));

// ========== COMPOSITION ==========
console.log("\n=== COMPOSITION ===");

// Using composition instead of inheritance
class Database {
    connect() {
        console.log("Connected to database");
        return this;
    }

    query(sql) {
        console.log(`Executing: ${sql}`);
        return this;
    }

    disconnect() {
        console.log("Disconnected from database");
        return this;
    }
}

class UserRepository {
    constructor(database) {
        this.database = database;
    }

    findUser(id) {
        this.database.query(`SELECT * FROM users WHERE id = ${id}`);
        return { id, name: "John" };
    }

    saveUser(user) {
        this.database.query(`INSERT INTO users (name) VALUES ('${user.name}')`);
        return user;
    }
}

const db = new Database();
const userRepo = new UserRepository(db);
userRepo.findUser(1);
userRepo.saveUser({ name: "Alice" });

// ========== ABSTRACT CLASSES ==========
console.log("\n=== ABSTRACT CLASSES ===");

class AbstractVehicle {
    constructor(make, model) {
        if (this.constructor === AbstractVehicle) {
            throw new Error("Abstract class cannot be instantiated");
        }
        this.make = make;
        this.model = model;
    }

    // Abstract method
    start() {
        throw new Error("Abstract method must be implemented");
    }

    // Abstract method
    stop() {
        throw new Error("Abstract method must be implemented");
    }

    // Concrete method
    info() {
        return `${this.make} ${this.model}`;
    }
}

class Car extends AbstractVehicle {
    constructor(make, model, doors) {
        super(make, model);
        this.doors = doors;
    }

    start() {
        console.log(`Car ${this.info()} is starting`);
        return this;
    }

    stop() {
        console.log(`Car ${this.info()} is stopping`);
        return this;
    }
}

class Motorcycle extends AbstractVehicle {
    constructor(make, model, type) {
        super(make, model);
        this.type = type;
    }

    start() {
        console.log(`Motorcycle ${this.info()} is starting`);
        return this;
    }

    stop() {
        console.log(`Motorcycle ${this.info()} is stopping`);
        return this;
    }
}

const car = new Car("Toyota", "Camry", 4);
car.start().stop();

const bike = new Motorcycle("Harley", "Davidson", "Cruiser");
bike.start().stop();

// ========== FACTORY PATTERN WITH CLASSES ==========
console.log("\n=== FACTORY PATTERN ===");

class VehicleFactory {
    createVehicle(type, params) {
        switch (type) {
            case 'car':
                return new Car(params.make, params.model, params.doors);
            case 'motorcycle':
                return new Motorcycle(params.make, params.model, params.type);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

const factory = new VehicleFactory();
const newCar = factory.createVehicle('car', { make: "Honda", model: "Civic", doors: 4 });
newCar.start();