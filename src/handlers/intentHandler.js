import { verifySignature } from '../utils/cryptoUtils.js';

const OWNER_ID = "owner123";

export function handleCodon(codon, getUserSecret) {
  const { intent, payload, meta } = codon;
  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;

  const secret = getUserSecret(userId);

  if (!secret) {
    console.log(`❌ No secret found for user ${userId}.`);
    return;
  }

  // ✅ Use updated function call
  console.log(`Message to verify: ${intent + JSON.stringify(payload) + userId}`);
  console.log(`Signature to verify: ${signature}`);

  const isValid = verifySignature(intent, payload, userId, signature, secret);

  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  if (userId !== OWNER_ID) {
    console.log(`🚫 Unauthorized: User ${userId} is not allowed to execute this intent.`);
    return;
  }

  if (intent === "open_camera") {
    console.log(`📷 Camera is now opened for user ${userId}.`);
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
