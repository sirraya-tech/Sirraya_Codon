import { CodonSdk } from '../src/sdk/codonSdk.js';

const sdk = new CodonSdk();
const userInput = "turn on flash";  // User's natural language input

// Parse the user input and generate the codon
const codon = sdk.parseUserInput(userInput);
