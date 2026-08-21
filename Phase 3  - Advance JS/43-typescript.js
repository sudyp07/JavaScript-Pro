// 43-typescript.js - TypeScript Basics

// ========== TYPE ANNOTATIONS ==========
console.log("=== TYPE ANNOTATIONS ===");

/*
// TypeScript code (not runnable directly in Node.js)
// Compile with: tsc 43-typescript.js

// Basic types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let id: number | string = "123"; // Union type
let status: "active" | "inactive" = "active"; // Literal type

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple
let tuple: [string, number] = ["John", 30];

// Any (avoid if possible)
let anything: any = "hello";
anything = 42;

// Unknown (type-safe alternative to any)
let unknownValue: unknown = "hello";
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());
}

// Void
function logMessage(message: string): void {
    console.log(message);
}

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
*/

// ========== INTERFACES ==========
console.log("\n=== INTERFACES ===");

/*
// Interface definition
interface User {
    id: number;
    name: string;
    email?: string; // Optional property
    readonly createdAt: Date; // Readonly property
    age?: number;
}

// Interface extending
interface Admin extends User {
    role: "admin";
    permissions: string[];
}

// Using interface
const user: User = {
    id: 1,
    name: "John",
    createdAt: new Date()
};

function printUser(user: User): void {
    console.log(`User: ${user.name} (${user.id})`);
}

// Function interface
interface GreetFunction {
    (name: string): string;
}

const greetFn: GreetFunction = (name) => {
    return `Hello, ${name}!`;
};
*/

// ========== TYPE ALIASES ==========
console.log("\n=== TYPE ALIASES ===");

/*
// Type alias for union
type Status = "pending" | "approved" | "rejected";

// Type alias for object
type User = {
    id: number;
    name: string;
    email?: string;
};

// Type alias with intersection
type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

type UserWithTimestamp = User & Timestamped;

// Type alias with conditional types
type ArrayOrString<T> = T extends string ? string : T[];

function process<T>(value: ArrayOrString<T>): void {
    if (Array.isArray(value)) {
        console.log("Processing array:", value.length);
    } else {
        console.log("Processing string:", value);
    }
}
*/

// ========== GENERICS ==========
console.log("\n=== GENERICS ===");

/*
// Generic function
function identity<T>(value: T): T {
    return value;
}

// Usage
const num = identity<number>(42);
const str = identity<string>("hello");

// Generic interface
interface Box<T> {
    value: T;
    getValue(): T;
}

// Generic class
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Generic constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
    console.log(`Length: ${item.length}`);
}
*/

// ========== UTILITY TYPES ==========
console.log("\n=== UTILITY TYPES ===");

/*
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<User>;

// Pick - selects specific properties
type UserNameAndEmail = Pick<User, "name" | "email">;

// Omit - removes specific properties
type UserWithoutId = Omit<User, "id">;

// Record - creates object type with keys and values
type UserMap = Record<string, User>;

// Exclude - removes types from union
type Status = "active" | "inactive" | "pending";
type ActiveStatus = Exclude<Status, "pending">;

// ReturnType - gets return type of function
function getUser(): User {
    return { id: 1, name: "John", email: "john@example.com", age: 30 };
}
type UserReturn = ReturnType<typeof getUser>;
*/

// ========== DECORATORS ==========
console.log("\n=== DECORATORS ===");

/*
// Class decorator
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// Method decorator
function log(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${key} with`, args);
        return original.apply(this, args);
    };
    return descriptor;
}

// Property decorator
function configurable(value: boolean) {
    return function(target: any, key: string) {
        const descriptor = Object.getOwnPropertyDescriptor(target, key) || {};
        descriptor.configurable = value;
        Object.defineProperty(target, key, descriptor);
    };
}

@sealed
class MyClass {
    @configurable(true)
    name: string = "John";
    
    @log
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}
*/

// ========== TYPE GUARDS ==========
console.log("\n=== TYPE GUARDS ===");

/*
// Type guard with typeof
function isString(value: unknown): value is string {
    return typeof value === "string";
}

// Type guard with instanceof
function isArray(value: unknown): value is any[] {
    return Array.isArray(value);
}

// Type guard with custom check
interface Car {
    type: "car";
    wheels: number;
}

interface Bike {
    type: "bike";
    hasGears: boolean;
}

type Vehicle = Car | Bike;

function isCar(vehicle: Vehicle): vehicle is Car {
    return vehicle.type === "car";
}

function processVehicle(vehicle: Vehicle) {
    if (isCar(vehicle)) {
        console.log(`Car with ${vehicle.wheels} wheels`);
    } else {
        console.log(`Bike with gears: ${vehicle.hasGears}`);
    }
}
*/

// ========== ADVANCED TYPES ==========
console.log("\n=== ADVANCED TYPES ===");

/*
// Mapped types
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Conditional types
type TypeName<T> = 
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

// Template literal types
type HttpMethod = "get" | "post" | "put" | "delete";
type Endpoint = `/${HttpMethod}s`;

// Indexed access types
interface User {
    id: number;
    name: string;
}
type UserId = User["id"]; // number
*/

// ========== TYPESCRIPT CONFIGURATION ==========
console.log("\n=== TYPESCRIPT CONFIGURATION ===");

console.log("Example tsconfig.json:");
console.log(`
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "lib": ["ES2020", "DOM"],
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "sourceMap": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
`);

// ========== TYPESCRIPT BEST PRACTICES ==========
console.log("\n=== TYPESCRIPT BEST PRACTICES ===");

console.log("1. Use strict mode");
console.log("2. Prefer interfaces over type aliases for objects");
console.log("3. Use type aliases for unions and complex types");
console.log("4. Use readonly for immutable properties");
console.log("5. Use const assertions for literal values");
console.log("6. Use generics for reusable code");
console.log("7. Use utility types when possible");
console.log("8. Use type guards for type narrowing");
console.log("9. Avoid using any");
console.log("10. Use unknown for type-safe alternatives to any");
console.log("11. Use union types for multiple possibilities");
console.log("12. Use optional properties with ?");
console.log("13. Use nullish coalescing and optional chaining");
console.log("14. Enable all strict checks");
console.log("15. Use JSDoc comments with types");