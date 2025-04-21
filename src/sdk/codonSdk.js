import { generateTelomere } from '../telomere/telomereGenerator.js';
import { parseCodonText } from '../core/codonParser.js';
import { getIntentData } from '../registry/intentRegistry.js';  // Import the intent registry

export class CodonSdk {
  // New method to parse user input
  parseUserInput(userInput) {
    // Get the intent data from the registry
    const { intent, payload, meta } = getIntentData(userInput);

    // Create codon with the intent data
    return this.createCodon(intent, payload, meta);
  }

  // Method to create a codon
  createCodon(intent, payload = {}, meta = {}) {
    // Generate the telomere from the intent + payload
    const telomere = generateTelomere(intent + JSON.stringify(payload));

    // Build the codon structure
    const codonText = `${telomere}::${intent}::${JSON.stringify(payload)}::${JSON.stringify(meta)}`;
    return this.parseCodon(codonText);
  }

  // Method to parse the codon structure
  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    console.log("✅ Parsed Codon:", codon);
    return codon;
  }
}
