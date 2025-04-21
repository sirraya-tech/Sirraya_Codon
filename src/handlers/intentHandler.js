import open from 'open';
import { verifySignature } from '../utils/cryptoUtils.js';

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

  // 🔥 MAGIC: open multiple tabs
  if (intent === "open_browser") {
    const urls = Array.isArray(payload.url) ? payload.url : [payload.url];
    for (const link of urls) {
      await open(link); // opens each in new tab/window
      console.log(`🌐 Opened: ${link}`);
    }
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
