# Codon SDK

A secure messaging framework for AI agent communication with cryptographic authentication and structured command patterns.

## Overview

The Codon SDK is a comprehensive messaging framework designed to solve the security and coordination challenges inherent in multi-agent AI systems. As AI agents become more prevalent in enterprise and consumer applications, the need for secure, verifiable, and auditable communication between agents has become critical.

### Problem Statement

Traditional AI agent communication faces several challenges:
- **Security Vulnerabilities**: Messages can be intercepted, modified, or replayed by malicious actors
- **Identity Verification**: No reliable way to verify which user or agent initiated a command
- **Audit Requirements**: Lack of cryptographic proof for compliance and debugging
- **Context Loss**: Commands lose environmental and temporal context during transmission
- **Multi-tenancy Issues**: Agents serving multiple users need isolation guarantees

### Solution Architecture

The Codon SDK addresses these challenges through a structured message format called a "codon" - a biological metaphor representing the basic unit of instruction in AI agent communication. Each codon contains four essential components:

1. **Telomere (Security Layer)**: A cryptographic signature that binds the message to a specific user and prevents tampering
2. **Intent (Command Layer)**: A structured identifier that specifies what action should be performed
3. **Payload (Data Layer)**: The actual data required to execute the intent
4. **Metadata (Context Layer)**: Environmental context, timestamps, and execution parameters

### Core Capabilities

**Cryptographic Authentication**: Every message is cryptographically signed using user-specific secrets, ensuring that only authorized users can generate valid commands for their agents.

**Natural Language Processing**: The SDK can parse natural language input and convert it into structured codons, enabling seamless human-to-agent communication.

**Context Awareness**: Codons automatically capture and include contextual information such as device location, time, user preferences, and environmental conditions.

**Multi-Agent Coordination**: The framework supports agent-to-agent communication, enabling complex workflows where agents can delegate tasks and coordinate actions.

**Audit Trail**: Every codon operation is logged with full cryptographic proof, providing complete traceability for security audits and debugging.

**Replay Attack Prevention**: Built-in expiration timestamps ensure that intercepted messages cannot be reused maliciously.

### Use Case Applications

**Smart Home Systems**: Secure control of IoT devices where multiple family members need different access levels and all commands must be auditable.

**Enterprise Automation**: AI agents managing business processes where security and compliance require cryptographic proof of authorization.

**Personal AI Assistants**: Multi-device AI systems where commands initiated on one device need secure execution across multiple platforms.

**Financial Services**: AI agents handling sensitive operations where regulatory compliance demands immutable audit trails.

**Healthcare AI**: Medical AI systems where patient privacy and HIPAA compliance require secure, verifiable communication.

### Technical Benefits

- **Zero Trust Architecture**: No implicit trust between agents; every command must be cryptographically verified
- **Horizontal Scalability**: The codon format enables distributed agent networks without central coordination
- **Language Agnostic**: The underlying protocol can be implemented in any programming language
- **Framework Independent**: Works with any AI agent framework or platform
- **Backwards Compatible**: New codon features can be added without breaking existing implementations

## Installation

```bash
npm install codon-sdk
```

## Quick Start

```javascript
import { CodonSdk } from 'codon-sdk';

const getUserSecret = async (userId) => {
  // Your secret retrieval logic
  return await database.getUserSecret(userId);
};

const sdk = new CodonSdk(getUserSecret);

// Parse natural language input
const codon = sdk.parseUserInput("Turn on bedroom lights", "user123");

// Create structured codon
const codon = sdk.createCodon(
  "device.control",
  { device: "bedroom_lights", action: "on" },
  { priority: "high" },
  "user123"
);
```

## Message Structure

Each codon follows this format:
```
telomere::intent::payload::metadata
```

- **telomere**: Cryptographic signature for authentication
- **intent**: Action or command identifier
- **payload**: Command data (JSON)
- **metadata**: Context and execution parameters

## API Reference

### Constructor

```javascript
new CodonSdk(getUserSecret)
```

**Parameters:**
- `getUserSecret` (Function): Returns user's private secret for cryptographic operations

### Methods

#### parseUserInput(userInput, userId)

Converts natural language to structured codon.

**Parameters:**
- `userInput` (string): User's natural language command
- `userId` (string): User identifier

**Returns:** Parsed codon object

**Example:**
```javascript
const codon = sdk.parseUserInput("Schedule meeting tomorrow at 2pm", "user123");
```

#### createCodon(intent, payload, meta, userId)

Creates cryptographically signed codon.

**Parameters:**
- `intent` (string): Action identifier
- `payload` (object): Command data (default: `{}`)
- `meta` (object): Additional metadata (default: `{}`)
- `userId` (string): User identifier (default: `'anonymous'`)

**Returns:** Parsed codon object

**Example:**
```javascript
const codon = sdk.createCodon(
  "calendar.create",
  { title: "Team Meeting", date: "2025-05-31", time: "14:00" },
  { priority: "high" },
  "user123"
);
```

#### parseCodon(codonText)

Parses codon string into structured object.

**Parameters:**
- `codonText` (string): Full codon string

**Returns:** Parsed codon object

## Security Model

### Authentication Flow

1. User provides input or creates codon
2. System generates cryptographic signature using user's secret
3. Signature verification occurs before execution
4. Context and expiration metadata added automatically

### Security Features

- **Cryptographic Signatures**: Every codon must be cryptographically valid
- **User Isolation**: Unique secrets prevent cross-user attacks
- **Replay Protection**: Built-in expiration timestamps
- **Audit Trail**: Full provenance tracking for all operations

## Dependencies

The SDK requires these utility modules:

### cryptoUtils.js
```javascript
export function generateTelomereWithUser(intent, payload, userId, secret) {
  // Generate secure cryptographic signature
}

export function verifySignature(intent, payload, userId, signature, secret) {
  // Verify message authenticity
}
```

### codonParser.js
```javascript
export function parseCodonText(codonText) {
  // Parse codon string into structured object
}
```

### intentRegistry.js
```javascript
export function getIntentData(userInput) {
  // Extract intent, payload, and metadata from natural language
}
```

### contextDetector.js
```javascript
export function detectContext() {
  // Capture environmental context (device, location, time)
}
```

## Usage Examples

### Smart Home Control
```javascript
// Input: "Turn on living room lights"
const codon = sdk.parseUserInput("Turn on living room lights", "user123");
// Result:
// {
//   intent: "device.control",
//   payload: { device: "living_room_lights", action: "on" },
//   context: { location: "home", time: "evening" }
// }
```

### Task Management
```javascript
// Input: "Remind me to call mom tomorrow"
const codon = sdk.parseUserInput("Remind me to call mom tomorrow", "user123");
// Result:
// {
//   intent: "reminder.create",
//   payload: { message: "Call mom", date: "2025-05-31" },
//   context: { device: "mobile", user_location: "office" }
// }
```

### Agent Delegation
```javascript
const codon = sdk.createCodon(
  "agent.delegate",
  { 
    task: "data_analysis", 
    target_agent: "analytics_bot", 
    dataset: "sales_q1" 
  },
  { 
    requesting_agent: "planning_bot", 
    priority: "urgent" 
  },
  "user123"
);
```

## Error Handling

```javascript
try {
  const codon = sdk.createCodon(intent, payload, meta, userId);
} catch (error) {
  if (error.message.includes("Unauthorized")) {
    // Handle authentication failure
    console.error("Signature verification failed");
  }
  // Handle other errors
}
```

## Best Practices

### Security
- Store user secrets securely (HSM, encrypted database)
- Implement proper secret rotation
- Use secure random number generation
- Monitor for suspicious codon patterns
- Implement rate limiting

### Development
- Always validate input before processing
- Implement comprehensive error handling
- Use TypeScript for better type safety
- Write unit tests for all codon operations
- Log all codon generation and verification events

## Implementation Checklist

Before using in production, implement:

- [ ] Secure secret storage mechanism
- [ ] Cryptographic signature generation and verification
- [ ] Natural language processing for intent extraction
- [ ] Context detection for environmental awareness
- [ ] Codon parsing and validation
- [ ] Error handling and logging
- [ ] Rate limiting and abuse prevention
- [ ] Unit and integration tests

## Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run security tests
npm run test:security
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit pull request

## License

MIT License - see LICENSE file for details