import { verifySignature } from '../utils/cryptoUtils.js';
import open from 'open';

export async function handleCodon(codon, getUserSecret) {
  const { intent, payload, meta } = codon;
  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;
  const secret = getUserSecret(userId);

  if (!secret) {
    console.log(`❌ No secret found for user ${userId}.`);
    return;
  }

  const message = intent + JSON.stringify(payload) + userId;
  const isValid = verifySignature(intent, payload, userId, signature, secret);

  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  const allowedOwners = ["owner123", "owner456"];
  if (!allowedOwners.includes(userId)) {
    console.log(`🚫 Unauthorized: User ${userId} is not allowed to execute this intent.`);
    return;
  }

  if (intent === "open_browser") {
    const url = payload.url || "https://default.example.com";
    console.log(`🌐 Opening browser for ${userId} with URL: ${url}`);
    await open(url);
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
