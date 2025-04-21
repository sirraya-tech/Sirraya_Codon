#!/usr/bin/env node

import readline from "readline";
import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

// Function to parse user input and generate codon
function parseNLPToCodonInput(text, userId, sdk) {
  let intent = null;
  let payload = {};

  if (text.toLowerCase().includes("open browser")) {
    intent = "open_browser";

    // ✅ Match domains like www.google.com, google.com, https://google.com, etc.
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?/g;
    const matches = [...text.matchAll(urlRegex)];
    const urls = matches.map(match => {
      const domain = match[0];
      return domain.startsWith("http") ? domain : `https://${domain}`;
    });

    if (urls.length > 0) {
      payload.url = urls;
    } else {
      payload.url = ["https://default.example.com"];
    }
  }

  if (!intent) {
    throw new Error("Could not determine intent from input");
  }

  return sdk.createCodon(intent, payload, {}, userId);
}

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
  prompt: "🧠 CodonCLI > ",
});

const userId = "owner123"; // User ID, could be dynamic if required

console.log("🚀 Welcome to Codon CLI Interface!");
console.log("💬 Type your intent (e.g., 'open browser with www.google.com and www.github.com')");

rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();

  if (input.toLowerCase() === "exit") {
    console.log("👋 Goodbye.");
    rl.close();
    return;
  }

  try {
    const codon = parseNLPToCodonInput(input, userId, sdk);
    console.log("🧬 Codon Created:");
    console.log(JSON.stringify(codon, null, 2));
    await handleCodon(codon, getUserSecret);
  } catch (err) {
    console.error("❌ Error handling codon:", err.message);
  }

  rl.prompt();
});
