import { generateTelomereWithUser, verifySignature } from '../utils/cryptoUtils.js';
import { parseCodonText } from '../core/codonParser.js';
import { getIntentData } from '../registry/intentRegistry.js';
import { detectContext } from '../context/contextDetector.js';

export class CodonSdk {
  constructor(getUserSecret) {
    this.getUserSecret = getUserSecret; // Function to fetch user secret (from DB, etc.)
  }

  // Parse user input with identity verification
  parseUserInput(userInput, userId) {
    const { intent, payload, meta } = getIntentData(userInput);
    return this.createCodon(intent, payload, meta, userId);
  }

  // Create the codon with a secure telomere, user identity, and context
  createCodon(intent, payload = {}, meta = {}, userId = 'anonymous') {
    const secret = this.getUserSecret(userId);
    
    // Generate the secure telomere and signature for the user
    const telomere = generateTelomereWithUser(intent, payload, userId, secret);
    const signature = telomere; // Signature could be the same or derived from telomere, depending on the use case
    
    // Log the generated signature for debugging
    console.log(`Generated telomere for user ${userId}: ${telomere}`);
    console.log(`Generated signature for user ${userId}: ${signature}`);

    // Check if the provided signature matches the expected signature for authentication
    if (!this.verifyUserSignature(intent, payload, userId, secret, signature)) {
      throw new Error("Unauthorized: Signature mismatch");
    }

    const context = detectContext();

    const fullMeta = {
      class: "DeviceCodon",
      expires_in: 30,
      ...meta,
      identity: {
        userId,
        signature
      },
      context
    };

    const codonText = `${telomere}::${intent}::${JSON.stringify(payload)}::${JSON.stringify(fullMeta)}`;

    return this.parseCodon(codonText);
  }

  // Verify the signature of the user
  verifyUserSignature(intent, payload, userId, secret, signature) {
    const message = intent + JSON.stringify(payload) + userId;

    // Log the message being used for signature verification
    console.log(`Message for signature verification: ${message}`);
    console.log(`Signature for verification: ${signature}`);

    // Verify the signature with the message and the secret key
    return verifySignature(message, signature, secret);
  }

  // Parse and display the full codon structure (for debugging/logging)
  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    console.log("Full Parsed Codon with Context Info:", JSON.stringify(codon, null, 2));
    return codon;
  }
}
