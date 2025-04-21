// src/meta/metaValidator.js

export function validateMeta(meta) {
  if (!meta || typeof meta !== 'object') {
    throw new Error("Invalid meta data.");
  }
  console.log("Meta validated.");
}
