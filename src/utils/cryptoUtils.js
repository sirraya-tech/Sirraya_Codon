// cryptoUtils.js
import crypto from 'crypto';

export function generateTelomereWithUser(intent, payload, userId, secret) {
  const message = intent + JSON.stringify(payload) + userId;
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

export function verifySignature(intent, payload, userId, signature, secret) {
  const expectedSignature = generateTelomereWithUser(intent, payload, userId, secret);
  return expectedSignature === signature;
}
