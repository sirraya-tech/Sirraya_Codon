import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

// Define user secrets
function getUserSecret(userId) {
  const secrets = {
    owner123: "super_secret_for_owner",
    hacker999: "super_secret_for_hacker"
  };
  return secrets[userId];
}

// Initialize SDK
const sdk = new CodonSdk(getUserSecret);

// ✅ Owner generates a valid codon with their correct secret
const validCodon = sdk.createCodon("open_camera", {}, {}, "owner123");

// ❌ Hacker tries to forge a codon pretending to be 'owner123'
const forgedCodonByHacker = {
  intent: "open_camera",
  payload: {},
  meta: {
    identity: {
      userId: "owner123",
      signature: "fake_signature_here" // hacker doesn't know the real secret
    }
  }
};

// Simulate usage
console.log("🔓 Owner Attempt:");
handleCodon(validCodon, getUserSecret); // ✅ pass getUserSecret here

console.log("\n🕵️ Hacker Attempt:");
handleCodon(forgedCodonByHacker, getUserSecret); // ✅ pass getUserSecret here
