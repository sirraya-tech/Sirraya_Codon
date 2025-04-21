// src/core/codonUtils.js

export function generateRandomString(length) {
  return Math.random().toString(36).substr(2, length);
}

export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
