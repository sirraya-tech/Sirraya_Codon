// src/utils/nlpParser.js

import nlp from "compromise";

// Function to parse user input with NLP
export function parseNLPToCodonInput(text, userId, sdk) {
  let intent = null;
  let payload = {};

  // Use NLP to recognize the intent and extract entities
  const doc = nlp(text);

  // Check if the user is asking to open a browser
  const isBrowserOpen = doc.has("open browser") || doc.has("browse");
  if (isBrowserOpen) {
    intent = "open_browser";

    // Try to detect URLs in the text (handle short forms and mispellings)
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/[^\s]*)?/g;
    const matches = [...text.matchAll(urlRegex)];
    const urls = matches.map(match => {
      const domain = match[0];
      return domain.startsWith("http") ? domain : `https://${domain}`;
    });

    if (urls.length > 0) {
      payload.url = urls;
    } else {
      // If no URLs found, use a default fallback URL
      payload.url = ["https://default.example.com"];
    }
  }

  // Check if the user is asking to open a terminal window
  const isTerminalOpen = doc.has("open terminal") || doc.has("run command");
  if (isTerminalOpen) {
    intent = "open_terminal";

    // Using global regex for 'run command' and extracting the command
    const commandRegex = /run command (.+)/i; // 'run command' followed by any text
    const commandMatch = text.match(commandRegex);  // Matching the user input to extract the command

    if (commandMatch && commandMatch[1]) {
      payload.command = [commandMatch[1]];  // Extracting the command from the match
    } else {
      // If no specific command is provided, fallback to a default command
      payload.command = ["echo Hello, World!"];
    }
  }

  // Add more intents here as needed (e.g., opening a file, sending a message, etc.)

  if (!intent) {
    throw new Error("Could not determine intent from input.");
  }

  return sdk.createCodon(intent, payload, {}, userId);
}
