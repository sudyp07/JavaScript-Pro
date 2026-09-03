// text-mmorpg.js
// Run with: node text-mmorpg.js

const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

// ==================== CONFIGURATION ====================
const SAVE_FILE = 'game_save.json';
const WORLD_SIZE = 20;
const MAX_PLAYERS = 100;

// ==================== READLINE SETUP ====================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function display(text, delay = 0) {
  console.log(text);
  if (delay > 0) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  return Promise.resolve();
}

// ==================== GAME DATA ====================
const RACES = {
  human: {
    name: 'Human',
    stats: { strength: 10, agility: 8, intelligence: 8, vitality: 10 },
    abilities: ['Adaptability', 'Quick Learner']
  },
  elf: {
    name: 'Elf',
    stats: { strength: 7, agility: 12, intelligence: 10, vitality: 8 },
    abilities: ['Night Vision', 'Archery Master']
  },
  dwarf: {
    name: 'Dwarf',
    stats: { strength: 13, agility: 6, intelligence: 7, vitality: 12 },
    abilities: ['Stone Skin', 'Blacksmithing']
  },
  orc: {
    name: 'Orc',
    stats: { strength: 15, agility: 5, intelligence: 5, vitality: 14 },
    abilities: ['Berserker Rage', 'Intimidate']
  }
};

const CLASSES = {
  warrior: {
    name: 'Warrior',
    stats: { strength: 5, agility: 2, intelligence: 0, vitality: 4 },
    abilities: ['Heavy Strike', 'Shield Block', 'War Cry']
  },
  mage: {
    name: 'Mage',
    stats: { strength: 0, agility: 1, intelligence: 6, vitality: 1 },
    abilities: ['Fireball', 'Ice Shield', 'Teleport']
  },
  rogue: {
    name: 'Rogue',
    stats: { strength: 2, agility: 5, intelligence: 1, vitality: 2 },
    abilities: ['Backstab', 'Stealth', 'Poison']
  },
  cleric: {
    name: 'Cleric',
    stats: { strength: 2, agility: 1, intelligence: 3, vitality: 3 },
    abilities: ['Heal', 'Holy Strike', 'Divine Shield']
  }
};

const MONSTERS = [
  { name: 'Goblin', hp: 20, attack: 5, defense: 2, xp: 15, gold: 5 },
  { name: 'Wolf', hp: 25, attack: 8, defense: 3, xp: 20, gold: 8 },
  { name: 'Orc', hp: 40, attack: 12, defense: 5, xp: 35, gold: 15 },
  { name: 'Troll', hp: 60, attack: 15, defense: 8, xp: 50, gold: 25 },
  { name: 'Giant Spider', hp: 35, attack: 10, defense: 4, xp: 30, gold: 12 },
  { name: 'Skeleton', hp: 30, attack: 9, defense: 6, xp: 25, gold: 10 },
  { name: 'Demon', hp: 80, attack: 20, defense: 10, xp: 80, gold: 40 },
  { name: 'Dragon', hp: 150, attack: 30, defense: 15, xp: 200, gold: 100 }
];

const ITEMS = {
  health_potion: { name: 'Health Potion', type: 'consumable', effect: { hp: 30 }, cost: 20 },
  mana_potion: { name: 'Mana Potion', type: 'consumable', effect: { mana: 25 }, cost: 15 },
  strength_potion: { name: 'Strength Potion', type: 'consumable', effect: { strength: 3 }, cost: 30, temp: true },
  agility_potion: { name: 'Agility Potion', type: 'consumable', effect: { agility: 3 }, cost: 30, temp: true },
  intelligence_potion: { name: 'Intelligence Potion', type: 'consumable', effect: { intelligence: 3 }, cost: 30, temp: true },
  vitality_potion: { name: 'Vitality Potion', type: 'consumable', effect: { vitality: 3 }, cost: 30, temp: true },
  iron_sword: { name: 'Iron Sword', type: 'weapon', stats: { attack: 5 }, cost: 100 },
  steel_sword: { name: 'Steel Sword', type: 'weapon', stats: { attack: 10 }, cost: 200 },
  magic_staff: { name: 'Magic Staff', type: 'weapon', stats: { attack: 8, intelligence: 5 }, cost: 250 },
  leather_armor: { name: 'Leather Armor', type: 'armor', stats: { defense: 3 }, cost: 80 },
  chain_armor: { name: 'Chain Armor', type: 'armor', stats: { defense: 6 }, cost: 150 },
  plate_armor: { name: 'Plate Armor', type: 'armor', stats: { defense: 10 }, cost: 300 }
};

const QUESTS = [
  {
    id: 1,
    name: 'Goblin Slayer',
    description: 'Kill 5 Goblins terrorizing the village',
    objective: { type: 'kill', target: 'Goblin', count: 5 },
    rewards: { xp: 100, gold: 50 },
    completed: false
  },
  {
    id: 2,
    name: 'Wolf Pack',
    description: 'Defeat 3 Wolves in the forest',
    objective: { type: 'kill', target: 'Wolf', count: 3 },
    rewards: { xp: 80, gold: 40 },
    completed: false
  },
  {
    id: 3,
    name: 'Troll Trouble',
    description: 'Eliminate the Troll blocking the bridge',
    objective: { type: 'kill', target: 'Troll', count: 1 },
    rewards: { xp: 120, gold: 60 },
    completed: false
  }
];

// ==================== GAME STATE ====================
class GameState {
  constructor() {
    this.player = null;
    this.world = this.generateWorld();
    this.quests = JSON.parse(JSON.stringify(QUESTS));
    this.turn = 0;
    this.messages = [];
  }

  generateWorld() {
    const world = [];
    for (let y = 0; y < WORLD_SIZE; y++) {
      world[y] = [];
      for (let x = 0; x < WORLD_SIZE; x++) {
        let terrain = 'grass';
        const rand = Math.random();
        if (rand < 0.1) terrain = 'forest';
        else if (rand < 0.15) terrain = 'mountain';
        else if (rand < 0.2) terrain = 'water';
        else if (rand < 0.25) terrain = 'town';
        
        world[y][x] = {
          terrain,
          explored: false,
          monster: null,
          items: [],
          hasDungeon: false,
          x, y
        };
      }
    }
    return world;
  }

  spawnMonster() {
    const monster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
    const level = Math.floor(this.player.level / 2);
    return {
      ...monster,
      hp: monster.hp + level * 5,
      maxHp: monster.hp + level * 5,
      attack: monster.attack + level * 2,
      defense: monster.defense + level,
      xp: monster.xp + level * 10,
      gold: monster.gold + level * 5
    };
  }
}

// ==================== PLAYER CLASS ====================
class Player {
  constructor(name, race, charClass) {
    this.name = name;
    this.race = race;
    this.class = charClass;
    this.level = 1;
    this.xp = 0;
    this.xpToNext = 100;
    this.gold = 50;
    
    // Stats
    this.baseStats = { ...RACES[race].stats };
    this.classStats = { ...CLASSES[charClass].stats };
    this.calculateStats();
    
    // Health
    this.maxHp = 50 + this.vitality * 5;
    this.hp = this.maxHp;
    this.maxMana = 20 + this.intelligence * 3;
    this.mana = this.maxMana;
    
    // Position
    this.x = Math.floor(WORLD_SIZE / 2);
    this.y = Math.floor(WORLD_SIZE / 2);
    
    // Inventory
    this.inventory = [];
    this.equipment = {
      weapon: null,
      armor: null
    };
    
    // Combat
    this.inCombat = false;
    this.currentMonster = null;
    
    // Buffs
    this.buffs = [];
  }

  calculateStats() {
    this.strength = this.baseStats.strength + this.classStats.strength;
    this.agility = this.baseStats.agility + this.classStats.agility;
    this.intelligence = this.baseStats.intelligence + this.classStats.intelligence;
    this.vitality = this.baseStats.vitality + this.classStats.vitality;
    
    // Level bonuses
    const levelBonus = Math.floor(this.level / 2);
    this.strength += levelBonus;
    this.agility += levelBonus;
    this.intelligence += levelBonus;
    this.vitality += levelBonus;
  }

  getAttack() {
    let attack = 5 + this.strength * 2;
    if (this.equipment.weapon) {
      attack += this.equipment.weapon.stats.attack || 0;
    }
    // Apply buffs
    this.buffs.forEach(buff => {
      if (buff.stat === 'strength') attack += buff.value;
    });
    return attack;
  }

  getDefense() {
    let defense = 2 + this.agility;
    if (this.equipment.armor) {
      defense += this.equipment.armor.stats.defense || 0;
    }
    return defense;
  }

  getMaxHp() {
    return 50 + this.vitality * 5;
  }

  getMaxMana() {
    return 20 + this.intelligence * 3;
  }

  gainXp(amount) {
    this.xp += amount;
    while (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.xpToNext = Math.floor(this.xpToNext * 1.5);
    this.calculateStats();
    this.maxHp = this.getMaxHp();
    this.maxMana = this.getMaxMana();
    this.hp = this.maxHp;
    this.mana = this.maxMana;
    console.log(`🎉 LEVEL UP! You are now level ${this.level}!`);
  }

  useItem(itemIndex) {
    if (itemIndex < 0 || itemIndex >= this.inventory.length) {
      return false;
    }
    const item = this.inventory[itemIndex];
    if (item.type !== 'consumable') {
      return false;
    }
    
    // Apply effects
    if (item.effect.hp) {
      this.hp = Math.min(this.maxHp, this.hp + item.effect.hp);
    }
    if (item.effect.mana) {
      this.mana = Math.min(this.maxMana, this.mana + item.effect.mana);
    }
    if (item.effect.strength) {
      this.strength += item.effect.strength;
      if (item.temp) {
        this.buffs.push({ stat: 'strength', value: item.effect.strength, duration: 5 });
      }
    }
    if (item.effect.agility) {
      this.agility += item.effect.agility;
      if (item.temp) {
        this.buffs.push({ stat: 'agility', value: item.effect.agility, duration: 5 });
      }
    }
    if (item.effect.intelligence) {
      this.intelligence += item.effect.intelligence;
      if (item.temp) {
        this.buffs.push({ stat: 'intelligence', value: item.effect.intelligence, duration: 5 });
      }
    }
    if (item.effect.vitality) {
      this.vitality += item.effect.vitality;
      if (item.temp) {
        this.buffs.push({ stat: 'vitality', value: item.effect.vitality, duration: 5 });
      }
    }
    
    this.inventory.splice(itemIndex, 1);
    console.log(`Used ${item.name}!`);
    return true;
  }

  equipItem(itemIndex) {
    const item = this.inventory[itemIndex];
    if (!item) return false;
    
    if (item.type === 'weapon') {
      if (this.equipment.weapon) {
        this.inventory.push(this.equipment.weapon);
      }
      this.equipment.weapon = item;
      this.inventory.splice(itemIndex, 1);
      console.log(`Equipped ${item.name}!`);
      return true;
    } else if (item.type === 'armor') {
      if (this.equipment.armor) {
        this.inventory.push(this.equipment.armor);
      }
      this.equipment.armor = item;
      this.inventory.splice(itemIndex, 1);
      console.log(`Equipped ${item.name}!`);
      return true;
    }
    return false;
  }

  getInfo() {
    return `
╔═══════════════════════════════════════╗
║ ${this.name} - Level ${this.level} ${this.class} ║
╠═══════════════════════════════════════╣
║ HP: ${this.hp}/${this.maxHp}  MP: ${this.mana}/${this.maxMana}
║ XP: ${this.xp}/${this.xpToNext}
║ Gold: ${this.gold}
╠═══════════════════════════════════════╣
║ STR: ${this.strength}  AGI: ${this.agility}
║ INT: ${this.intelligence}  VIT: ${this.vitality}
║ Attack: ${this.getAttack()}  Defense: ${this.getDefense()}
╚═══════════════════════════════════════╝`;
  }

  getInventory() {
    if (this.inventory.length === 0) {
      return '  (empty)';
    }
    return this.inventory.map((item, i) => 
      `  ${i+1}. ${item.name} (${item.type})`
    ).join('\n');
  }
}

// ==================== GAME ENGINE ====================
class GameEngine {
  constructor() {
    this.state = new GameState();
    this.running = true;
    this.commands = this.initCommands();
  }

  initCommands() {
    return {
      'help': { desc: 'Show all commands', action: () => this.showHelp() },
      'move': { desc: 'Move in direction (n/s/e/w)', action: (dir) => this.move(dir) },
      'look': { desc: 'Look around', action: () => this.look() },
      'status': { desc: 'Show player status', action: () => this.showStatus() },
      'inventory': { desc: 'Show inventory', action: () => this.showInventory() },
      'use': { desc: 'Use item (use <number>)', action: (num) => this.useItem(num) },
      'equip': { desc: 'Equip item (equip <number>)', action: (num) => this.equipItem(num) },
      'attack': { desc: 'Attack monster', action: () => this.attack() },
      'flee': { desc: 'Flee from combat', action: () => this.flee() },
      'rest': { desc: 'Rest to recover HP/MP', action: () => this.rest() },
      'quests': { desc: 'Show quests', action: () => this.showQuests() },
      'shop': { desc: 'Visit shop', action: () => this.shop() },
      'save': { desc: 'Save game', action: () => this.saveGame() },
      'load': { desc: 'Load game', action: () => this.loadGame() },
      'quit': { desc: 'Quit game', action: () => this.quit() }
    };
  }

  async start() {
    console.clear();
    await this.showTitle();
    await this.createCharacter();
    this.state.world[this.state.player.y][this.state.player.x].explored = true;
    
    console.log('\nWelcome to the world! Type "help" for commands.');
    await this.gameLoop();
  }

  async showTitle() {
    console.log(`
╔═══════════════════════════════════════╗
║         TEXT-BASED MMORPG             ║
║     An Epic Adventure Awaits!         ║
╚═══════════════════════════════════════╝
    `);
  }

  async createCharacter() {
    console.log('\n=== Character Creation ===\n');
    
    const name = await askQuestion('Enter your name: ');
    
    console.log('\nChoose your race:');
    const raceKeys = Object.keys(RACES);
    raceKeys.forEach((key, i) => {
      console.log(`${i+1}. ${RACES[key].name}`);
    });
    const raceChoice = await askQuestion('Choose (1-4): ');
    const race = raceKeys[parseInt(raceChoice) - 1];
    
    console.log('\nChoose your class:');
    const classKeys = Object.keys(CLASSES);
    classKeys.forEach((key, i) => {
      console.log(`${i+1}. ${CLASSES[key].name}`);
    });
    const classChoice = await askQuestion('Choose (1-4): ');
    const charClass = classKeys[parseInt(classChoice) - 1];
    
    this.state.player = new Player(name, race, charClass);
    console.log(`\nWelcome, ${name} the ${RACES[race].name} ${CLASSES[charClass].name}!`);
  }

  async gameLoop() {
    while (this.running) {
      const input = await askQuestion('\n> ');
      await this.processCommand(input);
    }
  }

  async processCommand(input) {
    const parts = input.toLowerCase().trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    if (this.commands[cmd]) {
      try {
        await this.commands[cmd].action(...args);
      } catch (error) {
        console.log('Error executing command:', error.message);
      }
    } else {
      console.log('Unknown command. Type "help" for available commands.');
    }
  }

  showHelp() {
    console.log('\n=== Commands ===');
    Object.entries(this.commands).forEach(([cmd, info]) => {
      console.log(`  ${cmd.padEnd(10)} - ${info.desc}`);
    });
  }

  async move(dir) {
    if (this.state.player.inCombat) {
      console.log('❌ You are in combat!');
      return;
    }

    const dirs = {
      'n': { x: 0, y: -1 },
      's': { x: 0, y: 1 },
      'e': { x: 1, y: 0 },
      'w': { x: -1, y: 0 }
    };
    
    const move = dirs[dir];
    if (!move) {
      console.log('Invalid direction. Use n/s/e/w');
      return;
    }
    
    const player = this.state.player;
    const newX = player.x + move.x;
    const newY = player.y + move.y;
    
    if (newX < 0 || newX >= WORLD_SIZE || newY < 0 || newY >= WORLD_SIZE) {
      console.log('You cannot go that way.');
      return;
    }
    
    player.x = newX;
    player.y = newY;
    const tile = this.state.world[newY][newX];
    tile.explored = true;
    
    // Random encounters
    if (Math.random() < 0.2 && tile.monster === null) {
      const monster = this.state.spawnMonster();
      tile.monster = monster;
      console.log(`\n⚔️ A wild ${monster.name} appeared!`);
      this.state.player.inCombat = true;
      this.state.player.currentMonster = monster;
    }
    
    await this.look();
  }

  async look() {
    const player = this.state.player;
    const tile = this.state.world[player.y][player.x];
    const terrain = tile.terrain;
    
    console.log(`\n📍 You are at (${player.x}, ${player.y}) - ${terrain}`);
    
    // Show surroundings
    const dirs = [
      { x: 0, y: -1, name: 'North' },
      { x: 0, y: 1, name: 'South' },
      { x: 1, y: 0, name: 'East' },
      { x: -1, y: 0, name: 'West' }
    ];
    
    dirs.forEach(dir => {
      const nx = player.x + dir.x;
      const ny = player.y + dir.y;
      if (nx >= 0 && nx < WORLD_SIZE && ny >= 0 && ny < WORLD_SIZE) {
        const neighbor = this.state.world[ny][nx];
        if (neighbor.explored) {
          const hasMonster = neighbor.monster ? ' (has monster)' : '';
          console.log(`  ${dir.name}: ${neighbor.terrain}${hasMonster}`);
        }
      }
    });
    
    if (tile.monster) {
      console.log(`\n⚔️ There is a ${tile.monster.name} here!`);
      console.log(`   HP: ${tile.monster.hp}/${tile.monster.maxHp}`);
    }
    
    if (tile.hasDungeon) {
      console.log('🏰 You see a dungeon entrance!');
    }
  }

  showStatus() {
    console.log(this.state.player.getInfo());
  }

  showInventory() {
    const player = this.state.player;
    console.log('\n=== Inventory ===');
    console.log(player.getInventory());
    
    console.log('\n=== Equipment ===');
    console.log(`Weapon: ${player.equipment.weapon ? player.equipment.weapon.name : 'None'}`);
    console.log(`Armor: ${player.equipment.armor ? player.equipment.armor.name : 'None'}`);
  }

  useItem(num) {
    const player = this.state.player;
    const index = parseInt(num) - 1;
    if (player.useItem(index)) {
      console.log('Item used successfully!');
    } else {
      console.log('Invalid item or cannot be used.');
    }
  }

  equipItem(num) {
    const player = this.state.player;
    const index = parseInt(num) - 1;
    if (player.equipItem(index)) {
      console.log('Item equipped!');
    } else {
      console.log('Invalid item or cannot be equipped.');
    }
  }

  async attack() {
    const player = this.state.player;
    if (!player.inCombat) {
      console.log('No monster to attack!');
      return;
    }
    
    const monster = player.currentMonster;
    const playerAttack = player.getAttack();
    const monsterDefense = monster.defense;
    
    // Player attack
    const damage = Math.max(1, playerAttack - monsterDefense + Math.floor(Math.random() * 5));
    monster.hp -= damage;
    console.log(`\n⚔️ You attack ${monster.name} for ${damage} damage!`);
    
    if (monster.hp <= 0) {
      // Monster defeated
      console.log(`🎉 You defeated ${monster.name}!`);
      player.gainXp(monster.xp);
      player.gold += monster.gold;
      console.log(`+${monster.xp} XP, +${monster.gold} gold`);
      
      // Drop items
      if (Math.random() < 0.3) {
        const drop = this.getRandomDrop();
        player.inventory.push(drop);
        console.log(`📦 ${drop.name} dropped!`);
      }
      
      player.inCombat = false;
      player.currentMonster = null;
      this.state.world[player.y][player.x].monster = null;
      return;
    }
    
    // Monster attack
    await display('⚔️ Monster attacks!');
    const monsterAttack = monster.attack;
    const playerDefense = player.getDefense();
    const monsterDamage = Math.max(1, monsterAttack - playerDefense + Math.floor(Math.random() * 3));
    player.hp -= monsterDamage;
    console.log(`${monster.name} attacks you for ${monsterDamage} damage!`);
    
    if (player.hp <= 0) {
      console.log(`💀 You have been defeated by ${monster.name}!`);
      player.hp = Math.floor(player.maxHp / 2);
      player.inCombat = false;
      player.currentMonster = null;
      this.state.world[player.y][player.x].monster = null;
      console.log('You wake up in town with half HP.');
    }
  }

  getRandomDrop() {
    const items = Object.values(ITEMS);
    return items[Math.floor(Math.random() * items.length)];
  }

  flee() {
    const player = this.state.player;
    if (!player.inCombat) {
      console.log('Nothing to flee from!');
      return;
    }
    
    if (Math.random() < 0.5) {
      console.log('🏃 You successfully fled!');
      player.inCombat = false;
      player.currentMonster = null;
      this.state.world[player.y][player.x].monster = null;
    } else {
      console.log('❌ Failed to flee!');
    }
  }

  rest() {
    const player = this.state.player;
    if (player.inCombat) {
      console.log('❌ Cannot rest in combat!');
      return;
    }
    
    const hpRecover = Math.floor(player.maxHp * 0.3);
    const manaRecover = Math.floor(player.maxMana * 0.3);
    player.hp = Math.min(player.maxHp, player.hp + hpRecover);
    player.mana = Math.min(player.maxMana, player.mana + manaRecover);
    console.log(`💤 You rest. +${hpRecover} HP, +${manaRecover} MP`);
  }

  showQuests() {
    console.log('\n=== Quests ===');
    this.state.quests.forEach(quest => {
      const status = quest.completed ? '✅' : '⬜';
      console.log(`${status} ${quest.name}`);
      console.log(`   ${quest.description}`);
      console.log(`   Rewards: ${quest.rewards.xp} XP, ${quest.rewards.gold} gold`);
    });
  }

  async shop() {
    const player = this.state.player;
    console.log('\n=== Shop ===');
    console.log(`Gold: ${player.gold}`);
    console.log('\nItems for sale:');
    
    const shopItems = Object.values(ITEMS).filter(item => item.cost);
    shopItems.forEach((item, i) => {
      console.log(`${i+1}. ${item.name} - ${item.cost} gold`);
    });
    
    const choice = await askQuestion('Buy item (number) or 0 to exit: ');
    const index = parseInt(choice) - 1;
    if (index >= 0 && index < shopItems.length) {
      const item = shopItems[index];
      if (player.gold >= item.cost) {
        player.gold -= item.cost;
        player.inventory.push({...item});
        console.log(`✅ Bought ${item.name}!`);
      } else {
        console.log('❌ Not enough gold!');
      }
    }
  }

  saveGame() {
    const saveData = {
      player: this.state.player,
      world: this.state.world,
      quests: this.state.quests,
      turn: this.state.turn
    };
    
    try {
      fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 2));
      console.log('✅ Game saved!');
    } catch (error) {
      console.log('❌ Failed to save game:', error.message);
    }
  }

  loadGame() {
    try {
      const data = JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8'));
      this.state.player = Object.assign(new Player('', '', ''), data.player);
      this.state.world = data.world;
      this.state.quests = data.quests;
      this.state.turn = data.turn;
      console.log('✅ Game loaded!');
    } catch (error) {
      console.log('❌ Failed to load game:', error.message);
    }
  }

  quit() {
    console.log('👋 Goodbye!');
    this.running = false;
    rl.close();
    process.exit(0);
  }
}

// ==================== START GAME ====================
const game = new GameEngine();
game.start().catch(error => {
  console.error('Game error:', error);
  rl.close();
});