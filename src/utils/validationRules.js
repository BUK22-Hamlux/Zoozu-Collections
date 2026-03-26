export const required = (fieldName) => (value) =>
  !value?.trim() ? `${fieldName} is required` : null;

export const minLength = (length) => (value) =>
  value.length < length ? `Minimum ${length} characters` : null;

export const email = () => (value) =>
  !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email" : null;

export const match = (field) => (value, values) =>
  value !== values[field] ? "Does not match" : null;

export const cardNumberRule = (luhnCheck) => (value) => {
  const stripped = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(stripped)) return "Card number must be 16 digits";
  if (!luhnCheck(stripped))
    return "Invalid card number — please check and re-enter";
  return null;
};

export const expiryRule = () => (value) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "Use MM/YY format";
  const [month, year] = value.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "This card has expired";
  }
  return null;
};

export const cvv = () => (value) =>
  !/^\d{3,4}$/.test(value) ? "Invalid CVV" : null;
