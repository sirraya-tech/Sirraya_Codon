// src/core/codonParser.js

export function parseCodonText(codonText) {
  const parts = codonText.split("::").map(part => part.trim());
  if (parts.length !== 4) {
    throw new Error("Invalid codon format. Expected 4 parts separated by '::'");
  }

  const [telomere, intent, payloadRaw, metaRaw] = parts;

  let payload, meta;
  try {
    payload = JSON.parse(payloadRaw);
    meta = JSON.parse(metaRaw);
  } catch (e) {
    throw new Error("Failed to parse payload or meta as JSON.");
  }

  return {
    telomere,
    intent,
    payload,
    meta,
  };
}
