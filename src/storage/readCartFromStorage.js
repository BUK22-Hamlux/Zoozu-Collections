function readCartFromStorage(CART_KEY) {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // Corrupted data — wipe it and start with an empty cart
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export default readCartFromStorage;
