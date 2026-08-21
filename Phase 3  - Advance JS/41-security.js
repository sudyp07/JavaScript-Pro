// 41-security.js - Security in JavaScript

// ========== CROSS-SITE SCRIPTING (XSS) ==========
console.log("=== CROSS-SITE SCRIPTING (XSS) ===");

// Preventing XSS
function escapeHTML(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}

const userInput = '<script>alert("XSS")</script>';
console.log("Unsafe:", userInput);
console.log("Safe:", escapeHTML(userInput));

// Simulating DOM manipulation safely
function safeSetText(element, text) {
    element.textContent = text; // Safe - escapes HTML
}

function safeSetHTML(element, html) {
    element.textContent = html; // Safe - treats as text
}

// ========== CROSS-SITE REQUEST FORGERY (CSRF) ==========
console.log("\n=== CROSS-SITE REQUEST FORGERY (CSRF) ===");

// CSRF protection with tokens
class CSRFProtection {
    constructor() {
        this.token = this.generateToken();
    }
    
    generateToken() {
        return Math.random().toString(36).substring(2) + 
               Date.now().toString(36);
    }
    
    getToken() {
        return this.token;
    }
    
    validateToken(token) {
        return this.token === token;
    }
}

const csrf = new CSRFProtection();
const token = csrf.getToken();
console.log("CSRF Token:", token);

// Validate request
function validateRequest(requestToken) {
    if (csrf.validateToken(requestToken)) {
        console.log("Valid request");
        return true;
    } else {
        console.log("Invalid CSRF token");
        return false;
    }
}

// ========== SQL INJECTION PREVENTION ==========
console.log("\n=== SQL INJECTION PREVENTION ===");

// Never use string concatenation for SQL queries
function safeQuery(userId) {
    // Using parameterized queries (simulated)
    console.log(`SELECT * FROM users WHERE id = ?`, userId);
    return { success: true, data: { id: userId, name: "John" } };
}

const maliciousInput = "1 OR 1=1";
console.log("Safe query:", safeQuery(maliciousInput));

// ========== CONTENT SECURITY POLICY (CSP) ==========
console.log("\n=== CONTENT SECURITY POLICY (CSP) ===");

// CSP headers (Node.js/Express)
/*
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://api.example.com"
    );
    next();
});
*/

console.log("Content Security Policy examples:");
console.log("1. default-src 'self' - Only allow same origin");
console.log("2. script-src - Allow scripts from trusted sources");
console.log("3. style-src - Allow styles from trusted sources");
console.log("4. img-src - Allow images from trusted sources");
console.log("5. font-src - Allow fonts from trusted sources");

// ========== AUTHENTICATION AND AUTHORIZATION ==========
console.log("\n=== AUTHENTICATION AND AUTHORIZATION ===");

// JWT token management (simulated)
class JWTManager {
    constructor(secret) {
        this.secret = secret;
        this.tokens = new Map();
    }
    
    generateToken(userId) {
        const token = `jwt_${userId}_${Date.now()}`;
        this.tokens.set(token, { userId, expires: Date.now() + 3600000 });
        return token;
    }
    
    validateToken(token) {
        const data = this.tokens.get(token);
        if (!data) return null;
        if (data.expires < Date.now()) {
            this.tokens.delete(token);
            return null;
        }
        return data.userId;
    }
    
    revokeToken(token) {
        this.tokens.delete(token);
    }
}

const jwt = new JWTManager('secret_key');
const userToken = jwt.generateToken(123);
console.log("JWT Token:", userToken);
console.log("Valid token:", jwt.validateToken(userToken));

// ========== SECURE CODING PRACTICES ==========
console.log("\n=== SECURE CODING PRACTICES ===");

// 1. Input validation
function validateInput(input, type) {
    switch(type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        case 'phone':
            return /^\d{10}$/.test(input);
        case 'username':
            return /^[a-zA-Z0-9_]{3,20}$/.test(input);
        case 'password':
            return input.length >= 8;
        default:
            return true;
    }
}

console.log("Email valid:", validateInput("test@example.com", "email"));
console.log("Email valid:", validateInput("invalid", "email"));

// 2. Password hashing
function hashPassword(password) {
    // In production, use bcrypt or similar
    // This is a simple simulation
    const hash = `hashed_${password}_${Date.now()}`;
    return hash;
}

function verifyPassword(password, hash) {
    // Simulated verification
    return hash === `hashed_${password}`;
}

const passwordHash = hashPassword("secure_password");
console.log("Password hash:", passwordHash);
console.log("Verify password:", verifyPassword("secure_password", passwordHash));

// 3. Secure session management
class SessionManager {
    constructor() {
        this.sessions = new Map();
    }
    
    createSession(userId) {
        const sessionId = `session_${Date.now()}_${Math.random()}`;
        this.sessions.set(sessionId, {
            userId,
            createdAt: Date.now(),
            expires: Date.now() + 3600000
        });
        return sessionId;
    }
    
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) return null;
        if (session.expires < Date.now()) {
            this.sessions.delete(sessionId);
            return null;
        }
        return session;
    }
    
    destroySession(sessionId) {
        this.sessions.delete(sessionId);
    }
}

const sessionManager = new SessionManager();
const sessionId = sessionManager.createSession(123);
console.log("Session ID:", sessionId);
console.log("Session data:", sessionManager.getSession(sessionId));

// ========== ENVIRONMENT VARIABLES ==========
console.log("\n=== ENVIRONMENT VARIABLES ===");

// Using environment variables for sensitive data
console.log("Never hardcode secrets in your code");
console.log("Use environment variables for:");
console.log("- API keys");
console.log("- Database credentials");
console.log("- JWT secrets");
console.log("- Third-party tokens");
console.log("- Environment-specific configs");

// Example of using env vars (Node.js)
/*
const API_KEY = process.env.API_KEY;
const DB_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
*/

// ========== RATE LIMITING ==========
console.log("\n=== RATE LIMITING ===");

class RateLimiter2 {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = new Map();
    }
    
    checkLimit(ip) {
        const now = Date.now();
        const userRequests = this.requests.get(ip) || [];
        const filtered = userRequests.filter(time => time > now - this.timeWindow);
        
        if (filtered.length >= this.maxRequests) {
            return false;
        }
        
        filtered.push(now);
        this.requests.set(ip, filtered);
        return true;
    }
}

const limiter2 = new RateLimiter2(5, 10000);

// Simulate requests
for (let i = 0; i < 7; i++) {
    console.log(`Request ${i + 1}:`, limiter2.checkLimit("127.0.0.1"));
}

// ========== SECURITY BEST PRACTICES ==========
console.log("\n=== SECURITY BEST PRACTICES ===");

console.log("1. Always validate and sanitize user input");
console.log("2. Use HTTPS in production");
console.log("3. Implement proper authentication");
console.log("4. Use secure session management");
console.log("5. Apply CSP headers");
console.log("6. Use CSRF tokens");
console.log("7. Implement rate limiting");
console.log("8. Keep dependencies up to date");
console.log("9. Use environment variables for secrets");
console.log("10. Implement proper error handling");
console.log("11. Use content security policies");
console.log("12. Implement XSS prevention");
console.log("13. Use parameterized queries for SQL");
console.log("14. Implement input validation");
console.log("15. Use secure password hashing");