// src/handlers/intents/index.js
import * as systemIntents from './system/index.js';  // Import all system intent handlers

// Map each intent string to its handler function
export const intentHandlers = {
  open_browser: systemIntents.handleOpenBrowser,
  open_terminal: systemIntents.handleOpenTerminal,
};
