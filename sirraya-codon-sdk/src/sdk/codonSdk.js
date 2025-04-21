import { generateTelomere } from '../telomere/telomereGenerator.js';
import { parseCodonText } from '../core/codonParser.js';

// Define a simple map of user input to intents
const intentMap = {
  "open camera": "open_camera",
  "turn on flash": "turn_on_flash",
  "play music": "play_music",
  // Add more intent mappings as needed
};

export class CodonSdk {
  // New method to parse user input
  parseUserInput(userInput) {
    // Convert user input to lowercase and match it to an intent
    const cleanedInput = userInput.toLowerCase().trim();
    const intent = intentMap[cleanedInput];

    if (!intent) {
      throw new Error(`Intent not recognized for input: "${userInput}"`);
    }

    // Create codon with the matched intent
    return this.createCodon(intent);
  }

  // Method to create a codon
  createCodon(intent, payload = {}) {
    const meta = {
      class: "DeviceCodon",
      expires_in: 30,
    };

    const telomere = generateTelomere(intent + JSON.stringify(payload));
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
