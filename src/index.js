// src/index.js

import { CodonSdk } from './sdk/codonSdk.js';

const sdk = new CodonSdk();

const codonText = 'abcd123xyz :: open_camera :: {"flash":"on","quality":"HD"} :: {"expires_in":30,"class":"DeviceCodon"}';

const codon = sdk.parseCodon(codonText);
console.log("✅ Codon Parsed:", codon);

sdk.executeCodon(codon);
