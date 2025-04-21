import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

// Basic NLP parser (can be improved with actual NLP model later)
function parseNLPToCodonInput(text, userId, sdk) {
  let intent = null;
  let payload = {};

  if (text.toLowerCase().includes("open browser")) {
    intent = "open_browser";

    const urlMatch = text.match(/(?:https?:\/\/)?(www\.[^\s]+)/);
    if (urlMatch) {
      const rawUrl = urlMatch[0];
      payload.url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    } else {
      payload.url = "https://default.example.com";
    }
  }

  if (!intent) {
    throw new Error("Could not determine intent from input");
  }

  return sdk.createCodon(intent, payload, {}, userId);
}

function getUserSecret(userId) {
  const secrets = {
    owner123: "super_secret_for_owner123",
    owner456: "super_secret_for_owner456"
  };

  if (!secrets[userId]) {
    console.log(`❌ No secret found for user ${userId}. Using fallback secret.`);
    return "fallback_secret_for_unknown_user";
  }

  return secrets[userId];
}

// Initialize SDK
const sdk = new CodonSdk(getUserSecret);

// 🧠 Simulate user input in plain English
const userInput = "open browser with website www.facebook.com";
const userId = "owner123";

try {
  const codon = parseNLPToCodonInput(userInput, userId, sdk);
  console.log("🔓 NLP-based Intent Execution:");
  await handleCodon(codon, getUserSecret);
} catch (err) {
  console.error("❌ Failed to process NLP input:", err.message);
}
