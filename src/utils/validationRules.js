export const required = (fieldName) => (value) =>
  !value?.trim() ? `${fieldName} is required` : null;

export const minLength = (length) => (value) =>
  value.length < length ? `Minimum ${length} characters` : null;

export const email = () => (value) =>
  !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email" : null;

export const match = (field) => (value, values) =>
  value !== values[field] ? "Does not match" : null;

export const cardNumber = () => (value) =>
  !/^\d{16}$/.test(value.replace(/\s/g, "")) ? "Card must be 16 digits" : null;

export const expiryDate = () => (value) =>
  !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? "Use MM/YY format" : null;

export const cvv = () => (value) =>
  !/^\d{3,4}$/.test(value) ? "Invalid CVV" : null;
