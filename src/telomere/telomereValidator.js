// src/telomere/telomereValidator.js

export function validateTelomere(telomere) {
  if (!telomere.startsWith('telomere-')) {
    throw new Error("Invalid Telomere format.");
  }
  console.log("Telomere validated.");
}
