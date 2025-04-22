// handleCodon.js
import { verifySignature } from '../utils/cryptoUtils.js';
import { handleOpenBrowser } from './intents/open_browser.js';
import { handleOpenTerminal } from './intents/open_terminal.js';

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

  // Intent Routing
  if (intent === "open_browser") {
    await handleOpenBrowser(payload);
  } else if (intent === "open_terminal") {
    handleOpenTerminal(payload);
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
