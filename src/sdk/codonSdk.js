import { generateTelomere } from '../telomere/telomereGenerator.js';
import { parseCodonText } from '../core/codonParser.js';
import { getIntentData } from '../registry/intentRegistry.js';  // Import the intent registry
import { detectContext } from '../context/contextDetector.js';  // Import the context detector

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

    // Auto-detect environment context
    const context = detectContext();

    // Merge meta with context
    const fullMeta = {
      class: "DeviceCodon",
      expires_in: 30,
      ...meta,
      context,  // Add context to the meta
    };

    // Build the codon structure
    const codonText = `${telomere}::${intent}::${JSON.stringify(payload)}::${JSON.stringify(fullMeta)}`;
    
    // Parse and return the codon
    return this.parseCodon(codonText);
  }

  // Method to parse the codon structure
  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    
    // Log the full parsed codon, including the context in a formatted way
    console.log("Full Parsed Codon with Context Info:", JSON.stringify(codon, null, 2));
    
    return codon;
  }
}
