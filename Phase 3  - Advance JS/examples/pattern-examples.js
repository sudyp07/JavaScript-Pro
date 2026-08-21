// examples/pattern-examples.js - Design Pattern Examples

// ========== SINGLETON PATTERN ==========
console.log("=== SINGLETON PATTERN ===");

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.id = Math.random();
        this.data = [];
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

const s1 = new Singleton();
const s2 = new Singleton();
s1.addItem("Item 1");
console.log("Singleton same instance:", s1 === s2);
console.log("Singleton data:", s1.getItems());
console.log("Singleton ID:", s1.id);

// ========== FACTORY PATTERN ==========
console.log("\n=== FACTORY PATTERN ===");

class Button {
    constructor(text, type = "primary") {
        this.text = text;
        this.type = type;
    }
    
    render() {
        return `<button class="btn btn-${this.type}">${this.text}</button>`;
    }
}

class Input {
    constructor(placeholder, type = "text") {
        this.placeholder = placeholder;
        this.type = type;
    }
    
    render() {
        return `<input type="${this.type}" placeholder="${this.placeholder}" />`;
    }
}

class UIFactory {
    createButton(text, type) {
        return new Button(text, type);
    }
    
    createInput(placeholder, type) {
        return new Input(placeholder, type);
    }
}

const uiFactory = new UIFactory();
const btn = uiFactory.createButton("Click Me", "danger");
const input = uiFactory.createInput("Enter text", "email");
console.log("Button:", btn.render());
console.log("Input:", input.render());

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
        console.log(`[${this.name}] Received update:`, data);
    }
}

const subject = new Subject();
const obs1 = new Observer("Observer 1");
const obs2 = new Observer("Observer 2");

subject.attach(obs1).attach(obs2);
subject.notify("Hello Observers!");

// ========== STRATEGY PATTERN ==========
console.log("\n=== STRATEGY PATTERN ===");

class PaymentStrategy {
    pay(amount) {
        throw new Error("pay() must be implemented");
    }
}

class CreditCardPayment extends PaymentStrategy {
    constructor(cardNumber) {
        super();
        this.cardNumber = cardNumber;
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

const processor = new PaymentProcessor(new CreditCardPayment("1234-5678"));
processor.processPayment(100);
processor.setStrategy(new PayPalPayment("user@example.com"));
processor.processPayment(150);

// ========== DECORATOR PATTERN ==========
console.log("\n=== DECORATOR PATTERN ===");

class Coffee {
    cost() {
        return 5;
    }
    
    description() {
        return "Coffee";
    }
}

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

// ========== COMMAND PATTERN ==========
console.log("\n=== COMMAND PATTERN ===");

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

class AddCommand {
    constructor(receiver, value) {
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

class SubtractCommand {
    constructor(receiver, value) {
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

const calc = new Calculator();
const manager = new CommandManager();

manager.execute(new AddCommand(calc, 5));
manager.execute(new AddCommand(calc, 3));
manager.execute(new SubtractCommand(calc, 2));

console.log("Undo:");
manager.undo();
manager.undo();
console.log("Redo:");
manager.redo();

// ========== MODULE PATTERN ==========
console.log("\n=== MODULE PATTERN ===");

const Module = (function() {
    let privateVar = 0;
    
    function privateMethod() {
        return privateVar;
    }
    
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

console.log("Person1:", person1.greet());
console.log("Person2:", person2.greet());
console.log("Person1 name:", person1.name);
console.log("Person2 name:", person2.name);

console.log("\n✅ Pattern examples completed!");