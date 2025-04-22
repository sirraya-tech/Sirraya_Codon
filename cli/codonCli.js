#!/usr/bin/env node

import readline from "readline";
import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";
import { parseNLPToCodonInput } from "../src/utils/nlpParser.js";  // Importing the new NLP parser module
import chalk from "chalk";  // Importing chalk for color styling
import figlet from "figlet"; // Importing figlet for large ASCII logo

// 🔐 Secrets
function getUserSecret(userId) {
  const secrets = {
    owner123: "super_secret_for_owner123",
    owner456: "super_secret_for_owner456",
  };

  if (!secrets[userId]) {
    console.log(`❌ No secret found for user ${userId}. Using fallback secret.`);
    return "fallback_secret_for_unknown_user";
  }

  return secrets[userId];
}

// Initialize SDK
const sdk = new CodonSdk(getUserSecret);

// CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "CodonCLI > ", // Now the prompt will display after the logo
});

const userId = "owner123"; // User ID, could be dynamic if required

// Generate ASCII Logo with Figlet
figlet('Sirraya Codon', (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }

  // Create padding and margin for the logo and text
  const paddingTopBottom = '\n'.repeat(2);  // Adds space at the top and bottom
  const paddingLeftRight = ' '.repeat(4); // Adds space on the left for centering

  // Display ASCII logo with color and branding
  const logo = chalk.blueBright(data); // Colored logo in blue
  const footer = chalk.cyan("🌐 Developed by Amir Hameed Mir");

  // Print logo with padding and centered text
  console.log(paddingTopBottom + paddingLeftRight + logo + '\n' + paddingLeftRight  + '\n' + footer + paddingTopBottom);
  
  // Now, show the CLI prompt after logo and text are printed
  rl.prompt();  // Display the prompt after the branding text
});

rl.on("line", async (line) => {
  const input = line.trim();

  if (input.toLowerCase() === "exit") {
    console.log(chalk.red("👋 Goodbye."));
    rl.close();
    return;
  }

  try {
    // Parsing the input with NLP for better flexibility
    const codon = await parseNLPToCodonInput(input, userId, sdk);
    console.log(chalk.green("🧬 Codon Created:"));
    console.log(chalk.white(JSON.stringify(codon, null, 2)));
    await handleCodon(codon, getUserSecret);
  } catch (err) {
    console.error(chalk.red("❌ Error handling codon:"), chalk.white(err.message));
  }

  rl.prompt();
});
