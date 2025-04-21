import crypto from 'crypto';

// Create a HMAC-based telomere using intent + payload + userId + secret
export function generateTelomereWithUser(intent, payload, userId, secret) {
  const data = intent + JSON.stringify(payload) + userId;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

// Sign a message (used for secure identity/auth)
export function signWithSecret(message, secret) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

// Verify a message against a given signature
export function verifySignature(message, signature, secret) {
  const expectedSignature = crypto.createHmac('sha256', secret).update(message).digest('hex');
  return expectedSignature === signature;
}
