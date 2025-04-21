import { generateTelomere } from '../telomere/telomereGenerator.js';
import { parseCodonText } from '../core/codonParser.js';

export class CodonSdk {
  createCodon(intent, payload = {}) {
    const meta = {
      class: "DeviceCodon",
      expires_in: 30,
    };

    const telomere = generateTelomere(intent + JSON.stringify(payload));
    const codonText = `${telomere}::${intent}::${JSON.stringify(payload)}::${JSON.stringify(meta)}`;
    return this.parseCodon(codonText);
  }

  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    console.log("✅ Parsed Codon:", codon);
    return codon;
  }

 
}
