import { generateTelomereWithUser, verifySignature } from '../utils/cryptoUtils.js';
import { parseCodonText } from '../core/codonParser.js';
import { getIntentData } from '../registry/intentRegistry.js';
import { detectContext } from '../context/contextDetector.js';

/**
 * CodonSdk is responsible for securely encoding and decoding user commands ("codons") 
 * with identity and context-awareness.
 */
export class CodonSdk {
  /**
   * @constructor
   * @param {function(string): string} getUserSecret - Function to retrieve a secret key for a given userId.
   */
  constructor(getUserSecret) {
    this.getUserSecret = getUserSecret;
  }

  /**
   * Parses raw user input and generates a codon.
   * @param {string} userInput - The natural language or structured command from the user.
   * @param {string} userId - Unique identifier for the user.
   * @returns {Object} Parsed codon object.
   */
  parseUserInput(userInput, userId) {
    const { intent, payload, meta } = getIntentData(userInput);
    return this.createCodon(intent, payload, meta, userId);
  }

  /**
   * Generates a codon text securely using a telomere and parses it.
   * @param {string} intent - The user's intended action.
   * @param {Object} [payload={}] - Optional parameters/data for the intent.
   * @param {Object} [meta={}] - Additional metadata.
   * @param {string} [userId='anonymous'] - User identifier (default is anonymous).
   * @returns {Object} Parsed codon object.
   * @throws {Error} Throws if signature verification fails.
   */
  createCodon(intent, payload = {}, meta = {}, userId = 'anonymous') {
    const secret = this.getUserSecret(userId);
    const telomere = generateTelomereWithUser(intent, payload, userId, secret);
    const signature = telomere;

    console.log(`🔐 Generated telomere for user ${userId}: ${telomere}`);

    const isVerified = verifySignature(intent, payload, userId, signature, secret);
    if (!isVerified) {
      throw new Error("❌ Unauthorized: Signature mismatch");
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

  /**
   * Parses a raw codon text string into its structured codon object.
   * @param {string} codonText - The serialized codon string.
   * @returns {Object} Parsed codon object.
   */
  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    return codon;
  }
}
