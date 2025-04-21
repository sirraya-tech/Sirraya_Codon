// tests/codonParser.test.js

import { parseCodonText } from '../src/core/codonParser.js';

test('parse valid codon', () => {
  const codonText = 'abcd123xyz :: open_camera :: {"flash":"on"} :: {"expires_in":30}';
  const codon = parseCodonText(codonText);
  expect(codon).toBeTruthy();
});
