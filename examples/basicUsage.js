import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

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

const sdk = new CodonSdk(getUserSecret);

// ✅ Owner creates a codon with payload including URL
const validCodonOwner123 = sdk.createCodon(
  "open_browser",
  { url: "https://chat.openai.com" }, // 👈 payload includes the URL
  {},
  "owner123"
);

// Simulate usage
console.log("🔓 Owner 123 Attempt:");
await handleCodon(validCodonOwner123, getUserSecret);
