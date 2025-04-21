// src/payload/payloadFormatter.js

export function formatPayload(payload) {
  return JSON.stringify(payload, null, 2);
}
