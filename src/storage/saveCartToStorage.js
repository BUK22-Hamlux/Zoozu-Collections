function saveCartToStorage(items, CART_KEY) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export default saveCartToStorage;
