#!/usr/bin/env node

import readline from "readline";
import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";
import { parseNLPToCodonInput } from "../src/utils/nlpParser.js"; // Importing the new NLP parser module
import chalk from "chalk"; // Importing chalk for color styling
import figlet from "figlet"; // Importing figlet for large ASCII logo
import fs from "fs";
import path from "path";

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
  console.log(paddingTopBottom + paddingLeftRight + logo + '\n' + paddingLeftRight + '\n' + footer + paddingTopBottom);

  // Now, show the menu and prompt after logo and text are printed
  showMenu(); // Show the menu after the logo
});

// Show Menu Function
function showMenu() {
  const menuOptions = `
  Please choose an option:
  1. Run Intent (Existing Functionality)
  2. Create Codon (For future use, not functional yet)
  3. View Documentation (View detailed documentation)
  4. Exit
  `;
  
  console.log(menuOptions);
  rl.prompt();
}

// Handle user input for menu options
rl.on("line", async (line) => {
  const input = line.trim();

  switch (input) {
    case "1":
      // Run Intent
      console.log(chalk.yellow("\n🔧 Proceeding with Intent execution..."));
      rl.question("Enter the intent in plain text: ", async (intentText) => {
        try {
          // Parsing the plain text intent to Codon input format
          const codon = await parseNLPToCodonInput(intentText, userId, sdk);
          console.log(chalk.green("🧬 Intent Executed:"));
          //console.log(chalk.white(JSON.stringify(codon, null, 2)));
          await handleCodon(codon, getUserSecret); // Run the intent
        } catch (err) {
          console.error(chalk.red("❌ Error executing intent:"), chalk.white(err.message));
        }
        showMenu(); // Show the menu again after processing
      });
      break;
    
    case "2":
      // Create Codon (Placeholder for future use)
      console.log(chalk.cyan("\n🔨 Codon creation is not implemented yet, but you can expect this feature soon."));
      showMenu(); // Show the menu again after displaying the placeholder message
      break;

    case "3":
      // Show actual documentation from markdown file
      console.log(chalk.cyan("\n📚 Here is your detailed documentation:\n"));
      try {
        const docPath = path.resolve("docs/sirraya-codon-docs.md"); // Path to your documentation file
        const docsContent = fs.readFileSync(docPath, "utf-8"); // Read the file synchronously
        console.log(chalk.white(docsContent)); // Display the documentation
      } catch (err) {
        console.error(chalk.red("❌ Failed to load documentation:"), err.message);
      }
      showMenu(); // Show the menu again after displaying documentation
      break;

    case "4":
      console.log(chalk.red("👋 Goodbye."));
      rl.close();
      break;

    default:
      console.log(chalk.red("❌ Invalid option, please choose again."));
      showMenu();
      break;
  }
});
