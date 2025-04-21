// src/core/codonValidator.js

export function validateCodon(codon) {
  if (!codon.telomere || !codon.intent || !codon.payload || !codon.meta) {
    throw new Error("Codon is missing required fields.");
  }

  // Additional validation rules can go here
  console.log("Codon validated successfully!");
}
