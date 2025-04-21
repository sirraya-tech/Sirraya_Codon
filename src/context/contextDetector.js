import os from 'os';

export function detectContext() {
  const platform = os.platform(); // 'win32', 'linux', 'darwin'
  const arch = os.arch();         // 'x64', 'arm', etc.
  const userInfo = os.userInfo();
  const hostname = os.hostname();

  const deviceType = (() => {
    switch (platform) {
      case 'win32': return 'Windows';
      case 'darwin': return 'macOS';
      case 'linux': return 'Linux';
      default: return 'Unknown';
    }
  })();

  // Get network-related information
  const networkInterfaces = os.networkInterfaces();
  const networkContext = Object.keys(networkInterfaces).map((iface) => {
    return networkInterfaces[iface].map((net) => {
      if (net.family === 'IPv4' && !net.internal) {
        return {
          name: iface,
          address: net.address,
          netmask: net.netmask,
        };
      }
      return null;
    }).filter(Boolean);
  }).flat();

  return {
    deviceType,
    platform,
    arch,
    hostname,
    user: userInfo.username,
    timestamp: new Date().toISOString(),
    network: networkContext, // Include network context directly here
  };
}
