// intents/open_browser.js
import open from 'open';

export async function handleOpenBrowser(payload) {
  const urls = Array.isArray(payload.url) ? payload.url : [payload.url];
  for (const link of urls) {
    try {
      await open(link);
      console.log(`🌐 Opened: ${link}`);
    } catch (err) {
      console.error(`❌ Failed to open: ${link}`, err);
    }
  }
}
