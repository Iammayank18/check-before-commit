#!/usr/bin/env node

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";


const fs = require("fs");
const path = require("path");
const readline = require("readline");

const checklistPath = path.resolve(process.cwd(), "checklist.json");

if (!fs.existsSync(checklistPath)) {
  console.error(`${RED}❌ checklist.json not found in project root.${RESET}`);
  console.log(`${YELLOW}Please create one with a checklist array, like:${RESET}\n`);
  console.log(`${CYAN}{
    "checklist": [
      "Removed all console.logs",
      "Passed all tests",
      "Used proper naming conventions"
    ]
  }${RESET}`);
  

  process.exit(1);
}

let checklist;
try {
  const content = fs.readFileSync(checklistPath, "utf-8");
  checklist = JSON.parse(content).checklist;

  if (!Array.isArray(checklist) || checklist.length === 0) {
    throw new Error("Checklist must be a non-empty array.");
  }
} catch (err) {
  console.error("❌ Error reading checklist.json:", err.message);
  process.exit(1);
}

console.log("\n📝 Please confirm each checklist item (y/n):\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let index = 0;

function askNext() {
  if (index >= checklist.length) {
    console.log(`${GREEN}✅ All checklist items confirmed. Proceeding with commit.${RESET}`);
    rl.close();
    process.exit(0);
  }

  const item = checklist[index];
  rl.question(`✔️ (${index + 1}/${checklist.length}) ${item.trim()} (y/n): `, (answer) => {
    const normalized = answer.trim().toLowerCase();

    if (normalized === "y") {
      index++;
      askNext();
    } else if (normalized === "n") {
      console.log(`${RED}❌ Commit aborted. Please complete all checklist items.${RESET}`);
      rl.close();
      process.exit(1);
    } else {
      console.log("❗ Please enter 'y' or 'n'.");
      askNext();
    }
  });
}

askNext();
