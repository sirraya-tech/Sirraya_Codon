const fs = require('fs');
const path = require('path');

// Function to create directories and files
function createFile(filePath, content = '') {
  const dirName = path.dirname(filePath);

  // Create directories if they don't exist
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  // Create the file and write content to it
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
}

// Folder structure definition
const structure = [
  {
    path: './sirraya-codon-sdk/src/core/codonParser.js',
    content: `// src/core/codonParser.js

export function parseCodonText(codonText) {
  const parts = codonText.split("::").map(part => part.trim());
  if (parts.length !== 4) {
    throw new Error("Invalid codon format. Expected 4 parts separated by '::'");
  }

  const [telomere, intent, payloadRaw, metaRaw] = parts;

  let payload, meta;
  try {
    payload = JSON.parse(payloadRaw);
    meta = JSON.parse(metaRaw);
  } catch (e) {
    throw new Error("Failed to parse payload or meta as JSON.");
  }

  return {
    telomere,
    intent,
    payload,
    meta,
  };
}
`
  },
  {
    path: './sirraya-codon-sdk/src/core/codonValidator.js',
    content: `// src/core/codonValidator.js

export function validateCodon(codon) {
  if (!codon.telomere || !codon.intent || !codon.payload || !codon.meta) {
    throw new Error("Codon is missing required fields.");
  }

  // Additional validation rules can go here
  console.log("Codon validated successfully!");
}
`
  },
  {
    path: './sirraya-codon-sdk/src/core/codonUtils.js',
    content: `// src/core/codonUtils.js

export function generateRandomString(length) {
  return Math.random().toString(36).substr(2, length);
}

export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
`
  },
  {
    path: './sirraya-codon-sdk/src/telomere/telomereGenerator.js',
    content: `// src/telomere/telomereGenerator.js

export function generateTelomere(data) {
  // Simulate generating a Telomere hash from data
  return 'telomere-' + data + '-' + Math.random().toString(36).substr(2, 9);
}
`
  },
  {
    path: './sirraya-codon-sdk/src/telomere/telomereValidator.js',
    content: `// src/telomere/telomereValidator.js

export function validateTelomere(telomere) {
  if (!telomere.startsWith('telomere-')) {
    throw new Error("Invalid Telomere format.");
  }
  console.log("Telomere validated.");
}
`
  },
  {
    path: './sirraya-codon-sdk/src/intent/intentHandler.js',
    content: `// src/intent/intentHandler.js

export function executeIntent(intent, payload) {
  if (intent === 'open_camera') {
    console.log("Executing Camera Open with payload:", payload);
  } else {
    console.log("Intent not recognized.");
  }
}
`
  },
  {
    path: './sirraya-codon-sdk/src/intent/intentValidator.js',
    content: `// src/intent/intentValidator.js

export function validateIntent(intent) {
  const allowedIntents = ['open_camera', 'send_message'];
  if (!allowedIntents.includes(intent)) {
    throw new Error("Intent not allowed.");
  }
  console.log("Intent is valid.");
}
`
  },
  {
    path: './sirraya-codon-sdk/src/payload/payloadParser.js',
    content: `// src/payload/payloadParser.js

export function parsePayload(payload) {
  try {
    return JSON.parse(payload);
  } catch (e) {
    throw new Error("Failed to parse payload.");
  }
}
`
  },
  {
    path: './sirraya-codon-sdk/src/payload/payloadFormatter.js',
    content: `// src/payload/payloadFormatter.js

export function formatPayload(payload) {
  return JSON.stringify(payload, null, 2);
}
`
  },
  {
    path: './sirraya-codon-sdk/src/meta/metaProcessor.js',
    content: `// src/meta/metaProcessor.js

export function processMeta(meta) {
  // Placeholder for metadata processing
  console.log("Processing Meta:", meta);
}
`
  },
  {
    path: './sirraya-codon-sdk/src/meta/metaValidator.js',
    content: `// src/meta/metaValidator.js

export function validateMeta(meta) {
  if (!meta || typeof meta !== 'object') {
    throw new Error("Invalid meta data.");
  }
  console.log("Meta validated.");
}
`
  },
  {
    path: './sirraya-codon-sdk/src/environment/codonEnvironment.js',
    content: `// src/environment/codonEnvironment.js

export function setCodonEnvironment(environment) {
  console.log("Setting environment:", environment);
}
`
  },
  {
    path: './sirraya-codon-sdk/src/sdk/codonSdk.js',
    content: `// src/sdk/codonSdk.js

import { parseCodonText } from '../core/codonParser.js';
import { validateCodon } from '../core/codonValidator.js';
import { generateTelomere } from '../telomere/telomereGenerator.js';
import { executeIntent } from '../intent/intentHandler.js';

export class CodonSdk {
  constructor() {
    this.version = '1.0.0';
  }

  parseCodon(codonText) {
    const codon = parseCodonText(codonText);
    validateCodon(codon);
    return codon;
  }

  generateTelomere(data) {
    return generateTelomere(data);
  }

  executeCodon(codon) {
    return executeIntent(codon.intent, codon.payload);
  }
}
`
  },
  {
    path: './sirraya-codon-sdk/src/index.js',
    content: `// src/index.js

import { CodonSdk } from './sdk/codonSdk.js';

const sdk = new CodonSdk();

const codonText = 'abcd123xyz :: open_camera :: {"flash":"on","quality":"HD"} :: {"expires_in":30,"class":"DeviceCodon"}';

const codon = sdk.parseCodon(codonText);
console.log("✅ Codon Parsed:", codon);

sdk.executeCodon(codon);
`
  },
  {
    path: './sirraya-codon-sdk/examples/basicUsage.js',
    content: `// examples/basicUsage.js

import { CodonSdk } from '../src/sdk/codonSdk.js';

const sdk = new CodonSdk();
const codonText = 'abcd123xyz :: open_camera :: {"flash":"on","quality":"HD"} :: {"expires_in":30}';
const codon = sdk.parseCodon(codonText);
console.log("Parsed Codon:", codon);
sdk.executeCodon(codon);
`
  },
  {
    path: './sirraya-codon-sdk/tests/codonParser.test.js',
    content: `// tests/codonParser.test.js

import { parseCodonText } from '../src/core/codonParser.js';

test('parse valid codon', () => {
  const codonText = 'abcd123xyz :: open_camera :: {"flash":"on"} :: {"expires_in":30}';
  const codon = parseCodonText(codonText);
  expect(codon).toBeTruthy();
});
`
  },
  {
    path: './package.json',
    content: `{
  "name": "sirraya-codon-sdk",
  "version": "1.0.0",
  "description": "Sirraya Codon SDK",
  "main": "src/index.js",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^27.0.6"
  }
}
`
  },
  {
    path: './README.md',
    content: `# Sirraya Codon SDK

This is a modular SDK for interacting with the Sirraya Codon system.

## Features:
- Codon Parsing
- Telomere Generation
- Intent Handling
- Payload Formatting
`
  }
];

// Generate the folders and files
structure.forEach(file => createFile(file.path, file.content));

console.log("🎉 Folder structure and files generated successfully!");
