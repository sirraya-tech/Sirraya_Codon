import React, { useState } from "react";
import { CodonSdk } from "../src/sdk/codonSdk.js";
import { handleCodon } from "../src/handlers/intentHandler.js";

const sdk = new CodonSdk(userId => {
  const secrets = {
    owner123: "super_secret_for_owner123",
  };
  return secrets[userId] || "fallback_secret";
});

export default function UniversalInput() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState("");
  const userId = "owner123";

  const parseTextToCodon = (text) => {
    const intent = "open_browser";
    const urls = text.match(/(?:https?:\/\/)?(www\.[^\s]+)/g) || [];
    const fullUrls = urls.map(u => u.startsWith("http") ? u : `https://${u}`);
    return sdk.createCodon(intent, { urls: fullUrls }, {}, userId);
  };

  const handleExecute = async () => {
    try {
      const codon = parseTextToCodon(input);
      setLog(`🧬 Codon created:\n${JSON.stringify(codon, null, 2)}`);
      await handleCodon(codon, sdk.getSecret);
      setLog(prev => prev + `\n✅ Executed!`);
    } catch (err) {
      setLog(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 bg-black text-green-400 font-mono">
      <textarea
        className="w-full h-24 p-2 bg-gray-900 text-white rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your command e.g. 'open browser with google.com and github.com'"
      />
      <button
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        onClick={handleExecute}
      >
        Run Codon
      </button>
      <pre className="mt-6 bg-gray-800 p-4 rounded">{log}</pre>
    </div>
  );
}
