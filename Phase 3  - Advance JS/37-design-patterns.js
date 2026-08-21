// 37-design-patterns.js - Design Patterns in JavaScript

// ========== SINGLETON PATTERN ==========
console.log("=== SINGLETON PATTERN ===");

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.data = [];
        this.id = Math.random();
        Singleton.instance = this;
    }
    
    addItem(item) {
        this.data.push(item);
        return this;
    }
    
    getItems() {
        return this.data;
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

instance1.addItem("Item 1");
console.log("Instance1 ID:", instance1.id);
console.log("Instance2 ID:", instance2.id);
console.log("Same instance:", instance1 === instance2);
console.log("Items:", instance2.getItems());

// Singleton with closure
const SingletonClosure = (function() {
    let instance;
    
    function createInstance() {
        return {
            id: Math.random(),
            data: [],
            add(item) {
                this.data.push(item);
                return this;
            }
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

const s1 = SingletonClosure.getInstance();
const s2 = SingletonClosure.getInstance();
s1.add("Hello");
console.log("Same instance:", s1 === s2);
console.log("Data:", s2.data);

// ========== FACTORY PATTERN ==========
console.log("\n=== FACTORY PATTERN ===");

// Simple factory
class Button {
    render() {
        return `<button>${this.text}</button>`;
    }
}

class Input {
    render() {
        return `<input placeholder="${this.placeholder}" />`;
    }
}

class Link {
    render() {
        return `<a href="${this.url}">${this.text}</a>`;
    }
}

class UIFactory {
    createButton(text) {
        const button = new Button();
        button.text = text;
        return button;
    }
    
    createInput(placeholder) {
        const input = new Input();
        input.placeholder = placeholder;
        return input;
    }
    
    createLink(text, url) {
        const link = new Link();
        link.text = text;
        link.url = url;
        return link;
    }
}

const factory = new UIFactory();
console.log(factory.createButton("Click me").render());
console.log(factory.createInput("Enter text").render());
console.log(factory.createLink("Google", "https://google.com").render());

// Abstract factory
class WindowsButton {
    render() {
        return `<button class="windows">${this.text}</button>`;
    }
}

class WindowsInput {
    render() {
        return `<input class="windows" placeholder="${this.placeholder}" />`;
    }
}

class MacButton {
    render() {
        return `<button class="mac">${this.text}</button>`;
    }
}

class MacInput {
    render() {
        return `<input class="mac" placeholder="${this.placeholder}" />`;
    }
}

class WindowsUIFactory {
    createButton(text) {
        const button = new WindowsButton();
        button.text = text;
        return button;
    }
    
    createInput(placeholder) {
        const input = new WindowsInput();
        input.placeholder = placeholder;
        return input;
    }
}

class MacUIFactory {
    createButton(text) {
        const button = new MacButton();
        button.text = text;
        return button;
    }
    
    createInput(placeholder) {
        const input = new MacInput();
        input.placeholder = placeholder;
        return input;
    }
}

function createUI(factory) {
    const button = factory.createButton("Submit");
    const input = factory.createInput("Name");
    return { button: button.render(), input: input.render() };
}

console.log("Windows UI:", createUI(new WindowsUIFactory()));
console.log("Mac UI:", createUI(new MacUIFactory()));

// ========== OBSERVER PATTERN ==========
console.log("\n=== OBSERVER PATTERN ===");

class Subject {
    constructor() {
        this.observers = [];
    }
    
    attach(observer) {
        this.observers.push(observer);
        return this;
    }
    
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        return this;
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
        return this;
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(`${this.name} received update:`, data);
    }
}

const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.attach(observer1).attach(observer2);
subject.notify("Hello Observers!");

// ========== MODULE PATTERN ==========
console.log("\n=== MODULE PATTERN ===");

const Module = (function() {
    // Private variables
    let privateVar = 0;
    
    // Private function
    function privateMethod() {
        return privateVar;
    }
    
    // Public API
    return {
        increment() {
            privateVar++;
            return this;
        },
        getValue() {
            return privateMethod();
        },
        reset() {
            privateVar = 0;
            return this;
        }
    };
})();

console.log("Module value:", Module.getValue());
Module.increment().increment();
console.log("Module value:", Module.getValue());

// ========== PROTOTYPE PATTERN ==========
console.log("\n=== PROTOTYPE PATTERN ===");

const prototype = {
    init(name, age) {
        this.name = name;
        this.age = age;
        return this;
    },
    greet() {
        return `Hello, I'm ${this.name}`;
    },
    clone() {
        return Object.create(Object.getPrototypeOf(this), 
            Object.getOwnPropertyDescriptors(this)
        );
    }
};

const person1 = Object.create(prototype).init("John", 25);
const person2 = person1.clone().init("Jane", 30);

console.log(person1.greet());
console.log(person2.greet());
console.log("Person1 name:", person1.name);
console.log("Person2 name:", person2.name);

// ========== DECORATOR PATTERN ==========
console.log("\n=== DECORATOR PATTERN ===");

// Base component
class Coffee {
    cost() {
        return 5;
    }
    
    description() {
        return "Coffee";
    }
}

// Decorators
function withMilk(coffee) {
    return {
        cost() {
            return coffee.cost() + 1.5;
        },
        description() {
            return coffee.description() + ", Milk";
        }
    };
}

function withSugar(coffee) {
    return {
        cost() {
            return coffee.cost() + 0.5;
        },
        description() {
            return coffee.description() + ", Sugar";
        }
    };
}

function withWhippedCream(coffee) {
    return {
        cost() {
            return coffee.cost() + 2;
        },
        description() {
            return coffee.description() + ", Whipped Cream";
        }
    };
}

let coffee = new Coffee();
console.log(coffee.description(), "Cost: $", coffee.cost());

coffee = withMilk(coffee);
console.log(coffee.description(), "Cost: $", coffee.cost());

coffee = withSugar(coffee);
console.log(coffee.description(), "Cost: $", coffee.cost());

coffee = withWhippedCream(coffee);
console.log(coffee.description(), "Cost: $", coffee.cost());

// ========== STRATEGY PATTERN ==========
console.log("\n=== STRATEGY PATTERN ===");

// Strategies
class PaymentStrategy {
    pay(amount) {
        throw new Error("pay() must be implemented");
    }
}

class CreditCardPayment extends PaymentStrategy {
    constructor(cardNumber, name) {
        super();
        this.cardNumber = cardNumber;
        this.name = name;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} with Credit Card ${this.cardNumber}`);
        return true;
    }
}

class PayPalPayment extends PaymentStrategy {
    constructor(email) {
        super();
        this.email = email;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} with PayPal ${this.email}`);
        return true;
    }
}

class CryptoPayment extends PaymentStrategy {
    constructor(wallet) {
        super();
        this.wallet = wallet;
    }
    
    pay(amount) {
        console.log(`Paid $${amount} with Crypto wallet ${this.wallet}`);
        return true;
    }
}

// Context
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

const processor = new PaymentProcessor(new CreditCardPayment("1234-5678", "John Doe"));
processor.processPayment(100);

processor.setStrategy(new PayPalPayment("john@example.com"));
processor.processPayment(150);

processor.setStrategy(new CryptoPayment("0x123...abc"));
processor.processPayment(200);

// ========== COMMAND PATTERN ==========
console.log("\n=== COMMAND PATTERN ===");

// Commands
class Command {
    execute() {
        throw new Error("execute() must be implemented");
    }
    
    undo() {
        throw new Error("undo() must be implemented");
    }
}

class AddCommand extends Command {
    constructor(receiver, value) {
        super();
        this.receiver = receiver;
        this.value = value;
    }
    
    execute() {
        this.receiver.add(this.value);
    }
    
    undo() {
        this.receiver.subtract(this.value);
    }
}

class SubtractCommand extends Command {
    constructor(receiver, value) {
        super();
        this.receiver = receiver;
        this.value = value;
    }
    
    execute() {
        this.receiver.subtract(this.value);
    }
    
    undo() {
        this.receiver.add(this.value);
    }
}

// Receiver
class Calculator {
    constructor() {
        this.value = 0;
    }
    
    add(value) {
        this.value += value;
        console.log(`Added ${value}, result: ${this.value}`);
    }
    
    subtract(value) {
        this.value -= value;
        console.log(`Subtracted ${value}, result: ${this.value}`);
    }
}

// Invoker
class CommandManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
    }
    
    execute(command) {
        command.execute();
        this.history.splice(this.currentIndex + 1);
        this.history.push(command);
        this.currentIndex = this.history.length - 1;
    }
    
    undo() {
        if (this.currentIndex >= 0) {
            this.history[this.currentIndex].undo();
            this.currentIndex--;
        }
    }
    
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.history[this.currentIndex].execute();
        }
    }
}

const calculator = new Calculator();
const manager = new CommandManager();

manager.execute(new AddCommand(calculator, 5));
manager.execute(new AddCommand(calculator, 3));
manager.execute(new SubtractCommand(calculator, 2));

manager.undo();
manager.undo();
manager.redo();