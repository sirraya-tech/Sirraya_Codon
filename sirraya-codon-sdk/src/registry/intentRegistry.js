// Define a registry of intents with their associated metadata and payloads
const intentRegistry = {
    "open camera": {
      intent: "open_camera",
      payload: { flash: "on", quality: "HD" },
      meta: { class: "DeviceCodon", expires_in: 30 },
    },
    "turn on flash": {
      intent: "turn_on_flash",
      payload: { flash: "on" },
      meta: { class: "DeviceCodon", expires_in: 30 },
    },
    "play music": {
      intent: "play_music",
      payload: { volume: 70 },
      meta: { class: "DeviceCodon", expires_in: 30 },
    },
    // Add more intents here as needed
  };
  
  // Function to get intent data from the registry
  export function getIntentData(userInput) {
    // Convert user input to lowercase and match it to an intent
    const cleanedInput = userInput.toLowerCase().trim();
    const intentData = intentRegistry[cleanedInput];
  
    if (!intentData) {
      throw new Error(`Intent not recognized for input: "${userInput}"`);
    }
  
    return intentData;
  }
  