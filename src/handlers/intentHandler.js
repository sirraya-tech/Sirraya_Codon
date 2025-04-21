// src/handlers/intentHandler.js
import { verifySignature } from '../utils/cryptoUtils.js';

const OWNER_ID = "owner123";

export function handleCodon(codon) {
  const { intent, payload, meta, telomere } = codon;

  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;

  // Construct the message to be hashed
  const message = intent + JSON.stringify(payload) + userId;

  const secret = process.env.SECRET_KEY || "super_secret";

  // Log the generated message and signature for debugging
  console.log(`Message to verify: ${message}`);
  console.log(`Signature to verify: ${signature}`);

  // Step 1: Verify the signature using the message
  const isValid = verifySignature(message, signature, secret);
  
  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  // Step 2: Check if the user is authorized
  if (userId !== OWNER_ID) {
    console.log(`🚫 Unauthorized: User ${userId} is not allowed to execute this intent.`);
    return;
  }

  // Step 3: Execute the intent
  if (intent === "open_camera") {
    console.log(`📷 Camera is now opened for user ${userId}.`);
    // Here, you would execute the actual logic to open the camera
  } else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}
