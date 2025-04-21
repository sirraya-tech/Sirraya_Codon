// src/payload/payloadParser.js

export function parsePayload(payload) {
  try {
    return JSON.parse(payload);
  } catch (e) {
    throw new Error("Failed to parse payload.");
  }
}
