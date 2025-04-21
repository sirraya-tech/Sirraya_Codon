import open from 'open';
import { verifySignature } from '../utils/cryptoUtils.js';
import { exec } from 'child_process';  // To run terminal commands

const AUTHORIZED_USERS = ["owner123", "owner456"];

export async function handleCodon(codon, getUserSecret) {
  const { intent, payload, meta } = codon;
  const userId = meta?.identity?.userId || "unknown";
  const signature = meta?.identity?.signature;

  const secret = getUserSecret(userId);
  if (!secret) {
    console.log(`❌ No secret found for user ${userId}.`);
    return;
  }

  const isValid = verifySignature(intent, payload, userId, signature, secret);
  if (!isValid) {
    console.log(`🚫 Invalid signature for user ${userId}. Request rejected.`);
    return;
  }

  if (!AUTHORIZED_USERS.includes(userId)) {
    console.log(`🚫 Unauthorized: User ${userId} is not allowed to execute this intent.`);
    return;
  }

  // 🔥 MAGIC: open multiple tabs (browser)
  if (intent === "open_browser") {
    const urls = Array.isArray(payload.url) ? payload.url : [payload.url];
    for (const link of urls) {
      await open(link); // opens each in new tab/window
      console.log(`🌐 Opened: ${link}`);
    }
  } 
  // 🔥 MAGIC: open terminal (run terminal commands)
  else if (intent === "open_terminal") {
    const commands = Array.isArray(payload.command) ? payload.command : [payload.command];
    for (const command of commands) {
      openTerminalWindow(command);
      console.log(`💻 Running command: ${command}`);
    }
  } 
  else {
    console.log(`❓ Unknown intent: ${intent}.`);
  }
}

// Function to open terminal and execute a command
function openTerminalWindow(command) {
  let terminalCommand;

  // Platform-specific logic
  if (process.platform === 'win32') {
    terminalCommand = `start cmd.exe /K "${command}"`; // On Windows, open cmd
  } else if (process.platform === 'darwin') {
    terminalCommand = `osascript -e 'tell application "Terminal" to do script "${command}"'`; // On MacOS, open Terminal
  } else if (process.platform === 'linux') {
    terminalCommand = `gnome-terminal -- bash -c "${command}"`; // On Linux, open GNOME terminal
  }

  // Execute the terminal command
  exec(terminalCommand, (err, stdout, stderr) => {
    if (err) {
      console.log(`❌ Error executing command: ${err}`);
      return;
    }
    if (stderr) {
      console.log(`⚠️ Error: ${stderr}`);
      return;
    }
    console.log(`✔️ Command executed: ${stdout}`);
  });
}
