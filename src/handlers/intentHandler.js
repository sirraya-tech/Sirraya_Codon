// handleCodon.js
import { verifySignature } from '../utils/cryptoUtils.js';
import { intentHandlers } from './intents/index.js';  // Importing from main index.js

const AUTHORIZED_USERS = ["owner123", "owner456"];

export async function handleCodon(codon, getUserSecret) {
  const { intent, payload, meta } = codon;
  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;

  const secret = getUserSecret(userId);
  if (!secret) {
    console.log(`❌ No secret found for user ${userId}.`);
    return;
  }

  const isValid = verifySignature(intent, payload, userId, signature, secret);
  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  if (!AUTHORIZED_USERS.includes(userId)) {
    console.log(`🚫 Unauthorized: User ${userId} is not allowed to execute this intent.`);
    return;
  }

  const handler = intentHandlers[intent];
  if (handler) {
    console.log(`Executing intent handler for: ${intent}`);
    await handler(payload);
  } else {
    console.log(`❓ Unknown or unsupported intent: ${intent}`);
    console.log(`Available intents:`, Object.keys(intentHandlers)); // Log available intents for debugging
  }
}