import crypto from 'crypto';

export function generateTelomere(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}
