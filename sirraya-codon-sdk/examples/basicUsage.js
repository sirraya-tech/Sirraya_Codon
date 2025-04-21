import { CodonSdk } from '../src/sdk/codonSdk.js';

const sdk = new CodonSdk();

const codon = sdk.createCodon("open_camera", {
  flash: "on",
  quality: "HD",
});

