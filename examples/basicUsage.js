import { CodonSdk } from '../src/sdk/codonSdk.js';

const sdk = new CodonSdk();
const userInput = "open camera";  // User's natural language input

// Parse the user input and generate the codon
const codon = sdk.parseUserInput(userInput);
