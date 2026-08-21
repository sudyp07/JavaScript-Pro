// 39-advanced-async.js - Advanced Asynchronous Programming

// ========== EVENT LOOP DEEP DIVE ==========
console.log("=== EVENT LOOP DEEP DIVE ===");

console.log("1. Start");

setTimeout(() => {
    console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise)");
});

process.nextTick(() => {
    console.log("4. Microtask (nextTick)");
});

console.log("5. End");

// Order: 1, 5, 4, 3, 2

// ========== MICROTASKS VS MACROTASKS ==========
console.log("\n=== MICROTASKS VS MACROTASKS ===");

function microtaskExample() {
    console.log("Microtask example");
    Promise.resolve().then(() => {
        console.log("Promise microtask");
    });
    process.nextTick(() => {
        console.log("nextTick microtask");
    });
    setTimeout(() => {
        console.log("setTimeout macrotask");
    }, 0);
    setImmediate(() => {
        console.log("setImmediate macrotask");
    });
}

microtaskExample();

// ========== ASYNC/AWAIT INTERNALS ==========
console.log("\n=== ASYNC/AWAIT INTERNALS ===");

async function asyncExample() {
    console.log("1. Async function start");
    
    const result = await new Promise((resolve) => {
        console.log("2. Promise executor");
        setTimeout(() => {
            console.log("3. Promise resolved");
            resolve("Data");
        }, 1000);
    });
    
    console.log("4. After await:", result);
    return "Done";
}

console.log("5. Before calling async");
const promise = asyncExample();
console.log("6. After calling async");
promise.then(result => console.log("7. Final result:", result));

// ========== STREAMS AND BACKPRESSURE ==========
console.log("\n=== STREAMS AND BACKPRESSURE ===");

// Simulating a stream with backpressure
class SimpleStream {
    constructor() {
        this.buffer = [];
        this.paused = false;
        this.highWaterMark = 3;
    }
    
    write(data) {
        if (this.paused) {
            console.log("Stream paused, queuing data");
        }
        this.buffer.push(data);
        if (this.buffer.length >= this.highWaterMark) {
            this.paused = true;
            console.log("Stream full, applying backpressure");
        }
        return !this.paused;
    }
    
    read() {
        if (this.buffer.length === 0) {
            return null;
        }
        const data = this.buffer.shift();
        this.paused = false;
        return data;
    }
}

const stream = new SimpleStream();
stream.write("Item 1");
stream.write("Item 2");
stream.write("Item 3");
stream.write("Item 4"); // Triggers backpressure
console.log("Reading:", stream.read());
console.log("Reading:", stream.read());

// ========== WEB WORKERS ==========
console.log("\n=== WEB WORKERS ===");

// Creating a worker (browser only)
/*
// worker.js
self.addEventListener('message', (event) => {
    const result = event.data * 2;
    self.postMessage(result);
});

// main.js
const worker = new Worker('worker.js');
worker.postMessage(5);
worker.addEventListener('message', (event) => {
    console.log('Worker result:', event.data);
});
*/

// Simulating web worker
class WorkerSimulator {
    constructor() {
        this.listeners = [];
    }
    
    postMessage(data) {
        // Simulate worker processing
        setTimeout(() => {
            const result = data * 2;
            this.listeners.forEach(listener => {
                listener({ data: result });
            });
        }, 1000);
    }
    
    addEventListener(event, callback) {
        if (event === 'message') {
            this.listeners.push(callback);
        }
    }
}

const worker = new WorkerSimulator();
worker.addEventListener('message', (event) => {
    console.log('Worker result:', event.data);
});
worker.postMessage(5);

// ========== CHILD PROCESSES (NODE.JS) ==========
console.log("\n=== CHILD PROCESSES (NODE.JS) ===");

// This would be used in Node.js environment
/*
const { spawn, fork, exec } = require('child_process');

// Spawn
const ls = spawn('ls', ['-la']);
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// Fork
const child = fork('child.js');
child.send('Hello from parent');
child.on('message', (message) => {
    console.log('Received from child:', message);
});

// Exec
exec('node --version', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
*/

// ========== CLUSTER MODULE ==========
console.log("\n=== CLUSTER MODULE ===");

// This would be used in Node.js environment
/*
const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    // Fork workers
    const numWorkers = require('os').cpus().length;
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Replace dead worker
    });
} else {
    // Worker process
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello from worker');
    }).listen(8000);
}
*/

// ========== WORKER THREADS (NODE.JS) ==========
console.log("\n=== WORKER THREADS (NODE.JS) ===");

// This would be used in Node.js environment
/*
const { Worker, parentPort } = require('worker_threads');

// main.js
const worker = new Worker('./worker.js', {
    workerData: { value: 5 }
});
worker.on('message', (result) => {
    console.log('Result:', result);
});

// worker.js
const { parentPort, workerData } = require('worker_threads');
const result = workerData.value * 2;
parentPort.postMessage(result);
*/

// ========== CANCELLABLE PROMISES ==========
console.log("\n=== CANCELLABLE PROMISES ===");

function cancellablePromise(promise) {
    let isCancelled = false;
    
    const wrapped = new Promise((resolve, reject) => {
        promise.then(
            value => isCancelled ? reject({ cancelled: true }) : resolve(value),
            error => isCancelled ? reject({ cancelled: true }) : reject(error)
        );
    });
    
    return {
        promise: wrapped,
        cancel() {
            isCancelled = true;
        }
    };
}

const cancellable = cancellablePromise(
    new Promise((resolve) => setTimeout(() => resolve("Data"), 2000))
);

setTimeout(() => {
    cancellable.cancel();
    console.log("Promise cancelled");
}, 1000);

cancellable.promise
    .then(result => console.log("Result:", result))
    .catch(error => {
        if (error.cancelled) {
            console.log("Promise was cancelled");
        } else {
            console.error("Error:", error);
        }
    });

// ========== RATE LIMITING ==========
console.log("\n=== RATE LIMITING ===");

class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }
    
    async throttle(fn) {
        const now = Date.now();
        this.requests = this.requests.filter(time => time > now - this.timeWindow);
        
        if (this.requests.length >= this.maxRequests) {
            const waitTime = this.requests[0] + this.timeWindow - now;
            console.log(`Rate limited, waiting ${waitTime}ms`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        this.requests.push(now);
        return fn();
    }
}

const limiter = new RateLimiter(2, 1000);

async function testRateLimit() {
    for (let i = 1; i <= 5; i++) {
        await limiter.throttle(async () => {
            console.log(`Request ${i} completed`);
        });
    }
}

testRateLimit();

// ========== RETRY WITH EXPONENTIAL BACKOFF ==========
console.log("\n=== RETRY WITH EXPONENTIAL BACKOFF ===");

async function retryWithBackoff(fn, maxRetries = 5, initialDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            
            const delay = initialDelay * Math.pow(2, attempt - 1);
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

let attemptCount = 0;
const unstableFn = async () => {
    attemptCount++;
    if (attemptCount < 3) {
        throw new Error(`Attempt ${attemptCount} failed`);
    }
    return "Success!";
};

retryWithBackoff(unstableFn, 3, 500)
    .then(result => console.log("Retry result:", result))
    .catch(error => console.error("Retry failed:", error.message));

// ========== ASYNC QUEUE ==========
console.log("\n=== ASYNC QUEUE ===");

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }
    
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        }
        
        this.isProcessing = false;
        this.process();
    }
}

const queue = new AsyncQueue();

async function testQueue() {
    const results = await Promise.all([
        queue.add(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return "Task 1";
        }),
        queue.add(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return "Task 2";
        }),
        queue.add(async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return "Task 3";
        })
    ]);
    
    console.log("Queue results:", results);
}

testQueue();