import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

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
    owner456: "super_secret_for_owner456"
  };

  if (!secrets[userId]) {
    console.log(`❌ No secret found for user ${userId}. Using fallback secret.`);
    return "fallback_secret_for_unknown_user";
  }

  return secrets[userId];
}

// 🚀 Main Simulation
const sdk = new CodonSdk(getUserSecret);
const userInput = "open browser with websites www.amazon.com ";
const userId = "owner123";

try {
  const codon = parseNLPToCodonInput(userInput, userId, sdk);
  console.log("🔓 NLP-based Intent Execution:");
  await handleCodon(codon, getUserSecret);
} catch (err) {
  console.error("❌ Failed to process NLP input:", err.message);
}
