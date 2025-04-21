import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

// Define user secrets
function getUserSecret(userId) {
  const secrets = {
    owner123: "super_secret_for_owner123",
    owner456: "super_secret_for_owner456"
  };
  
  // Safe fallback: if the userId doesn't exist, return a default value or log the error
  if (!secrets[userId]) {
    console.log(`❌ No secret found for user ${userId}. Using fallback secret.`);
    return "fallback_secret_for_unknown_user";  // A fallback secret
  }
  
  return secrets[userId];
}

// Initialize SDK
const sdk = new CodonSdk(getUserSecret);

// ✅ Owner 1 generates a valid codon with their correct secret (owner123)
const validCodonOwner123 = sdk.createCodon("open_browser", {}, {}, "owner123");



// Simulate both owners trying to execute the same codon at the same time
console.log("🔓 Owner 123 Attempt (Simultaneous):");
handleCodon(validCodonOwner123, getUserSecret); // ✅ This should pass



