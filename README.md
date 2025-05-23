# check-before-commit

Prevent Git commits unless your custom checklist is completed.

---

## Installation

Install as a dev dependency (with Husky):

Using npm:

```bash
npm install --save-dev check-before-commit husky
```

Using yarn:

```bash
yarn add --dev check-before-commit husky
```

---

## Setup

### Step 1: Create your checklist

Create a `commit-checklist.json` file in your project root:

```json
{
  "checklist": [
    "Removed all console.logs",
    "Used proper naming conventions",
    "Code tested and passed"
  ]
}
```

---

### Step 2: Setup Husky (if not already set up)

If you **do not have Husky installed**, run:

```bash
npx husky install
```

Add this to your `package.json` scripts to enable Husky on install:

```json
"scripts": {
  "prepare": "husky install"
}
```

---

### Step 3: Add the pre-commit hook

Run this command to add the pre-commit hook that runs the checklist:

```bash
npx husky add .husky/pre-commit "node ./node_modules/check-before-commit/bin/cli.js"
```

*If you already have Husky hooks, this will add a new pre-commit hook without removing existing ones.*

---

## Usage

When committing, you’ll be prompted to confirm each checklist item by typing `y` (yes) or `n` (no).

* Typing `y` for all items lets the commit proceed.
* Typing `n` for any item will abort the commit until all checklist items are confirmed.

---

## Customize

Edit your `commit-checklist.json` anytime to update your checklist.

---

If you want me to help write the full package.json or setup scripts for publishing, just ask!
