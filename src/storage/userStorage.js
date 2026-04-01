// ─── Keys ────────────────────────────────────────────────────────────────────
export const USERS_KEY = "zoozu-users";
export const AUTH_KEY = "zoozu-auth-user";

// ─── Users list ──────────────────────────────────────────────────────────────
export const getUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

// ─── Active session ───────────────────────────────────────────────────────────
export const getAuthUser = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveAuthUser = (user) => {
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEY);
};

// ─── Per-user data helpers ────────────────────────────────────────────────────
// All user-specific data (orders, cart, preferences) is stored INSIDE the
// user object in the users list. This means:
//   - Each user's data is completely isolated
//   - Logging in as a different user loads that user's data automatically
//   - No global keys like "zoozu-orders" that all users share

export const getUserRecord = (email) => {
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
};

export const updateUserRecord = (email, patch) => {
  const users = getUsers();
  const updated = users.map((u) =>
    u.email === email ? { ...u, ...patch } : u,
  );
  saveUsers(updated);
};

// Orders
export const getUserOrders = (email) => {
  const record = getUserRecord(email);
  return record?.orders || [];
};

export const saveUserOrders = (email, orders) =>
  updateUserRecord(email, { orders });

// Cart
export const getUserCart = (email) => {
  const record = getUserRecord(email);
  return record?.cart || [];
};

export const saveUserCart = (email, cart) => updateUserRecord(email, { cart });

// Preferences
export const getUserPrefs = (email) => {
  const record = getUserRecord(email);
  return (
    record?.preferences || {
      emailNotifications: true,
      marketingEmails: false,
      smsNotifications: false,
    }
  );
};

export const saveUserPrefs = (email, preferences) =>
  updateUserRecord(email, { preferences });
