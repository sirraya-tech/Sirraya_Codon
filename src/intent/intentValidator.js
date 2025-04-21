// src/intent/intentValidator.js

export function validateIntent(intent) {
  const allowedIntents = ['open_camera', 'send_message'];
  if (!allowedIntents.includes(intent)) {
    throw new Error("Intent not allowed.");
  }
  console.log("Intent is valid.");
}
