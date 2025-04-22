// intents/index.js
import { handleOpenBrowser } from './open_browser.js';
import { handleOpenTerminal } from './open_terminal.js';

// Map each intent to its handler function
export const intentHandlers = {
  open_browser: handleOpenBrowser,
  open_terminal: handleOpenTerminal,
};
