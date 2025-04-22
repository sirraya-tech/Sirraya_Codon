// intents/open_terminal.js
import { exec } from 'child_process';

export function handleOpenTerminal(payload) {
  const commands = Array.isArray(payload.command) ? payload.command : [payload.command];
  for (const command of commands) {
    openTerminalWindow(command);
    console.log(`💻 Running command: ${command}`);
  }
}

function openTerminalWindow(command) {
  let terminalCommand;

  if (process.platform === 'win32') {
    terminalCommand = `start cmd.exe /K "${command}"`;
  } else if (process.platform === 'darwin') {
    terminalCommand = `osascript -e 'tell application "Terminal" to do script "${command}"'`;
  } else if (process.platform === 'linux') {
    terminalCommand = `gnome-terminal -- bash -c "${command}"`;
  }

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
