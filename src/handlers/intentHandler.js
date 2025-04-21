import { verifySignature } from '../utils/cryptoUtils.js';
import open from 'open';

// List of authorized owners
const OWNER_IDS = ["owner123", "owner456", "owner789"]; // Add more owners here

export function handleCodon(codon, getUserSecret) {
  const { intent, payload, meta } = codon;
  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;

  // Get the user's secret based on their user ID
  const secret = getUserSecret(userId);

  if (!secret) {
    console.log(`❌ No secret found for user ${userId}.`);
    return;
  }

  // Log the message and signature to verify
  console.log(`Message to verify: ${intent + JSON.stringify(payload) + userId}`);
  console.log(`Signature to verify: ${signature}`);

  // Verify the signature
  const isValid = verifySignature(intent, payload, userId, signature, secret);

  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  // Check if the user is an authorized owner
  if (!OWNER_IDS.includes(userId)) {
    console.log(`🚫 Unauthorized: User ${userId} is not an authorized owner.`);
    return;
  }

  // Simulated intent handler
async function handleIntent(intent, userId) {
  if (intent === "open_browser") {
    console.log(`🌐 Opening browser for user ${userId}...`);
    await open('https://www.example.com'); // Or any context-specific URL
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
handleIntent("open_browser", "user123");

}
