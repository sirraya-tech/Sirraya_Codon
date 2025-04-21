import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

// Define the method to get a user's secret key (mocked for this example)
function getUserSecret(userId) {
  // For demonstration purposes, let's assume each user has a unique secret
  const secrets = {
    owner123: "super_secret_for_owner",
    hacker999: "super_secret_for_hacker"
  };

  return secrets[userId];
}

// Initialize the Codon SDK
const sdk = new CodonSdk(getUserSecret);

// Generate a valid codon for the owner
const validCodon = sdk.createCodon("open_camera", {}, {}, "owner123");

// Generate an invalid codon for the hacker
const invalidCodon = sdk.createCodon("open_camera", {}, {}, "hacker999");

// Simulate handling the valid and invalid codons
console.log("🔓 Owner Attempt:");
handleCodon(validCodon);  // Should allow the camera to be opened

console.log("\n🕵️ Hacker Attempt:");
handleCodon(invalidCodon);  // Should reject with Unauthorized access
