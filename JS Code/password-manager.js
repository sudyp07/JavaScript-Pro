// password-manager.js
// Run with: node password-manager.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

// ==================== CONFIGURATION ====================
const DATA_FILE = path.join(__dirname, 'passwords.enc');
const MASTER_KEY_FILE = path.join(__dirname, '.master.key');
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

// ==================== UTILITY FUNCTIONS ====================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function askPassword(query) {
  return new Promise(resolve => {
    const stdin = process.stdin;
    const stdout = process.stdout;
    stdout.write(query);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    let password = '';
    stdin.on('data', function onData(char) {
      char = char.toString();
      if (char === '\n' || char === '\r') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        stdout.write('\n');
        resolve(password);
      } else if (char === '\u007f' || char === '\b') {
        if (password.length > 0) {
          password = password.slice(0, -1);
          stdout.write('\b \b');
        }
      } else {
        password += char;
        stdout.write('*');
      }
    });
  });
}

// ==================== CRYPTO FUNCTIONS ====================
function generateMasterKey() {
  return crypto.randomBytes(32).toString('hex');
}

function getMasterKey() {
  if (fs.existsSync(MASTER_KEY_FILE)) {
    return fs.readFileSync(MASTER_KEY_FILE, 'utf8').trim();
  }
  return null;
}

function saveMasterKey(key) {
  fs.writeFileSync(MASTER_KEY_FILE, key, { mode: 0o600 });
}

function encrypt(text, key) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(JSON.stringify(text));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, key) {
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  } catch (error) {
    console.error('❌ Failed to decrypt data. Wrong master password?');
    return null;
  }
}

// ==================== PASSWORD STORAGE ====================
function loadPasswords(masterKey) {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  const encrypted = fs.readFileSync(DATA_FILE, 'utf8');
  return decrypt(encrypted, masterKey) || {};
}

function savePasswords(passwords, masterKey) {
  const encrypted = encrypt(passwords, masterKey);
  fs.writeFileSync(DATA_FILE, encrypted, { mode: 0o600 });
}

// ==================== PASSWORD GENERATOR ====================
function generatePassword(options = {}) {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
    excludeAmbiguous = false
  } = options;

  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (excludeSimilar) {
    chars = chars.replace(/[il1Lo0O]/g, '');
  }
  if (excludeAmbiguous) {
    chars = chars.replace(/[{}[]()\/\\'"]/g, '');
  }

  if (chars.length === 0) {
    throw new Error('No character sets selected!');
  }

  let password = '';
  const array = new Uint32Array(length);
  crypto.randomFillSync(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const strengths = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return {
    score: score,
    strength: strengths[score],
    suggestions: []
  };
}

// ==================== MAIN FUNCTIONS ====================
async function setupMasterPassword() {
  console.log('\n🔐 First time setup - Create master password');
  const password = await askPassword('Enter master password: ');
  const confirm = await askPassword('Confirm master password: ');
  
  if (password !== confirm) {
    console.log('❌ Passwords do not match!');
    process.exit(1);
  }

  const key = generateMasterKey();
  saveMasterKey(key);
  
  // Save encrypted empty password store
  savePasswords({}, key);
  
  console.log('✅ Master password created successfully!');
  return key;
}

async function login() {
  console.log('\n🔐 Enter your master password');
  const password = await askPassword('Master password: ');
  
  const masterKey = getMasterKey();
  if (!masterKey) {
    console.log('❌ No master key found. Please setup first.');
    process.exit(1);
  }

  // Try to decrypt with the key
  const passwords = loadPasswords(masterKey);
  if (passwords === null) {
    console.log('❌ Incorrect master password!');
    process.exit(1);
  }

  console.log('✅ Login successful!');
  return masterKey;
}

async function addPassword(masterKey) {
  const passwords = loadPasswords(masterKey);
  
  console.log('\n📝 Add New Password');
  const name = await askQuestion('Service/Name: ');
  const username = await askQuestion('Username/Email: ');
  
  console.log('\nPassword options:');
  console.log('1. Generate strong password');
  console.log('2. Enter custom password');
  const choice = await askQuestion('Choose (1/2): ');
  
  let password;
  if (choice === '1') {
    const length = await askQuestion('Password length (default 16): ') || 16;
    password = generatePassword({ length: parseInt(length) });
    console.log(`\nGenerated password: ${password}`);
    const strength = checkPasswordStrength(password);
    console.log(`Strength: ${strength.strength}`);
  } else {
    password = await askPassword('Enter password: ');
  }
  
  const notes = await askQuestion('Notes (optional): ');
  
  passwords[name] = {
    username,
    password,
    notes,
    created: new Date().toISOString()
  };
  
  savePasswords(passwords, masterKey);
  console.log(`✅ Password for "${name}" saved!`);
}

async function listPasswords(masterKey) {
  const passwords = loadPasswords(masterKey);
  const entries = Object.keys(passwords);
  
  if (entries.length === 0) {
    console.log('\n📭 No passwords saved yet.');
    return;
  }
  
  console.log('\n📋 Saved Passwords:');
  console.log('─'.repeat(60));
  entries.forEach((name, index) => {
    const entry = passwords[name];
    console.log(`${index + 1}. ${name}`);
    console.log(`   Username: ${entry.username}`);
    console.log(`   Password: ${'•'.repeat(entry.password.length)}`);
    if (entry.notes) console.log(`   Notes: ${entry.notes}`);
    console.log(`   Created: ${entry.created}`);
    console.log('─'.repeat(60));
  });
}

async function getPassword(masterKey) {
  const passwords = loadPasswords(masterKey);
  const name = await askQuestion('Enter service name: ');
  
  if (!passwords[name]) {
    console.log(`❌ No password found for "${name}"`);
    return;
  }
  
  const entry = passwords[name];
  console.log(`\n🔑 ${name}`);
  console.log(`Username: ${entry.username}`);
  console.log(`Password: ${entry.password}`);
  if (entry.notes) console.log(`Notes: ${entry.notes}`);
  console.log(`Created: ${entry.created}`);
  
  // Copy to clipboard (macOS/Linux/Windows)
  try {
    const clipboard = require('child_process');
    if (process.platform === 'darwin') {
      clipboard.execSync(`echo "${entry.password}" | pbcopy`);
    } else if (process.platform === 'linux') {
      clipboard.execSync(`echo "${entry.password}" | xclip -selection clipboard`);
    } else if (process.platform === 'win32') {
      clipboard.execSync(`echo ${entry.password} | clip`);
    }
    console.log('📋 Password copied to clipboard!');
  } catch (error) {
    // Clipboard not available, ignore
  }
}

async function deletePassword(masterKey) {
  const passwords = loadPasswords(masterKey);
  const name = await askQuestion('Enter service name to delete: ');
  
  if (!passwords[name]) {
    console.log(`❌ No password found for "${name}"`);
    return;
  }
  
  const confirm = await askQuestion(`Delete "${name}"? (y/n): `);
  if (confirm.toLowerCase() === 'y') {
    delete passwords[name];
    savePasswords(passwords, masterKey);
    console.log(`✅ "${name}" deleted!`);
  } else {
    console.log('❌ Deletion cancelled');
  }
}

async function generateAndShow() {
  console.log('\n🔑 Password Generator');
  const length = await askQuestion('Length (default 16): ') || 16;
  const useUppercase = await askQuestion('Include uppercase? (y/n, default y): ') || 'y';
  const useLowercase = await askQuestion('Include lowercase? (y/n, default y): ') || 'y';
  const useNumbers = await askQuestion('Include numbers? (y/n, default y): ') || 'y';
  const useSymbols = await askQuestion('Include symbols? (y/n, default y): ') || 'y';
  
  const password = generatePassword({
    length: parseInt(length),
    uppercase: useUppercase.toLowerCase() !== 'n',
    lowercase: useLowercase.toLowerCase() !== 'n',
    numbers: useNumbers.toLowerCase() !== 'n',
    symbols: useSymbols.toLowerCase() !== 'n'
  });
  
  console.log(`\n🔑 Generated Password: ${password}`);
  const strength = checkPasswordStrength(password);
  console.log(`Strength: ${strength.strength}`);
  console.log(`\n💡 Tip: Save this password using "Add Password" option`);
}

// ==================== MENU ====================
async function showMenu(masterKey) {
  while (true) {
    console.log('\n' + '═'.repeat(50));
    console.log('🔐 PASSWORD MANAGER');
    console.log('═'.repeat(50));
    console.log('1. Add New Password');
    console.log('2. List All Passwords');
    console.log('3. Get Password');
    console.log('4. Delete Password');
    console.log('5. Generate Password');
    console.log('6. Check Password Strength');
    console.log('7. Exit');
    console.log('═'.repeat(50));
    
    const choice = await askQuestion('Choose option: ');
    
    switch (choice) {
      case '1':
        await addPassword(masterKey);
        break;
      case '2':
        await listPasswords(masterKey);
        break;
      case '3':
        await getPassword(masterKey);
        break;
      case '4':
        await deletePassword(masterKey);
        break;
      case '5':
        await generateAndShow();
        break;
      case '6':
        await checkPasswordInteractive();
        break;
      case '7':
        console.log('\n👋 Goodbye!');
        rl.close();
        process.exit(0);
      default:
        console.log('❌ Invalid option');
    }
  }
}

async function checkPasswordInteractive() {
  const password = await askPassword('Enter password to check: ');
  const strength = checkPasswordStrength(password);
  console.log(`\nStrength: ${strength.strength}`);
  console.log(`Score: ${strength.score}/6`);
  
  if (strength.score < 3) {
    console.log('\n💡 Suggestions:');
    console.log('- Use at least 12 characters');
    console.log('- Include uppercase, lowercase, numbers, and symbols');
    console.log('- Avoid common words or patterns');
  }
}

// ==================== MAIN ====================
async function main() {
  console.log('🔐 Password Manager & Generator\n');
  
  // Check if master key exists
  if (!fs.existsSync(MASTER_KEY_FILE)) {
    await setupMasterPassword();
  }
  
  const masterKey = await login();
  await showMenu(masterKey);
}

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye!');
  rl.close();
  process.exit(0);
});

// Run the app
main().catch(error => {
  console.error('❌ Error:', error.message);
  rl.close();
});