import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to 'intents' directory
const intentsDir = path.join(__dirname);

// Prepare the handler map
export const intentHandlers = {};

// Go through each subfolder (like 'system')
const subfolders = fs.readdirSync(intentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const folder of subfolders) {
  const folderPath = path.join(intentsDir, folder);
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    if (file.endsWith('.js')) {
      const { [getHandlerName(file)]: handler } = await import(`./${folder}/${file}`);

      // Generate intent key like 'open_browser' from file name
      const intentName = getIntentKey(file);
      intentHandlers[intentName] = handler;
    }
  }
}

// Convert `open_browser.js` → `open_browser`
function getIntentKey(filename) {
  return filename.replace('.js', '');
}

// Convert `open_browser.js` → `handleOpenBrowser`
function getHandlerName(filename) {
  const camelCased = filename
    .replace('.js', '')
    .split('_')
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join('');
  return `handle${camelCased.charAt(0).toUpperCase() + camelCased.slice(1)}`;
}
