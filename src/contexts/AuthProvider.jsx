import toast from "react-hot-toast";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  getUsers,
  saveUsers,
  getAuthUser,
  saveAuthUser,
} from "../storage/userStorage";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getAuthUser());

  const loggedIn = !!user;

  // ── REGISTER ────────────────────────────────────────────────────────────────
  const register = (userData) => {
    const users = getUsers();

    const userExists = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (userExists) {
      toast.error("An account with this email already exists.");
      return false;
    }

    const newUser = {
      name: userData.fullName,
      email: userData.email.toLowerCase(),
      password: userData.password,
    };

    saveUsers([...users, newUser]);

    const sessionUser = { name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    saveAuthUser(sessionUser);

    toast.success("Registration successful! Welcome to Zoozu.");
    return true;
  };

  // ── LOGIN ───────────────────────────────────────────────────────────────────
  const login = (userData) => {
    const users = getUsers();

    const found = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (!found) {
      toast.error("No account found with that email. Please register first.");
      return false;
    }

    if (found.password !== userData.password) {
      toast.error("Incorrect password. Please try again.");
      return false;
    }

    const sessionUser = { name: found.name, email: found.email };
    setUser(sessionUser);
    saveAuthUser(sessionUser);

    toast.success(`Welcome back, ${found.name || "there"}!`);
    return true;
  };

  // ── UPDATE NAME ─────────────────────────────────────────────────────────────
  // Only the display name is editable — email is the login key and cannot
  // be changed from the profile page without a full re-verification flow.
  const updateName = (newName) => {
    const users = getUsers();

    // Find the user record by email (email is the unique identifier)
    const updated = users.map((u) =>
      u.email === user.email ? { ...u, name: newName } : u,
    );

    saveUsers(updated);

    // Update the session object too so Navbar/WelcomeBanner reflect the change
    const updatedSession = { ...user, name: newName };
    setUser(updatedSession);
    saveAuthUser(updatedSession);
  };

  // ── UPDATE PASSWORD ─────────────────────────────────────────────────────────
  // Returns an error string if validation fails, or null on success.
  // The component checks the return value to decide what to show the user.
  const updatePassword = (currentPassword, newPassword) => {
    const users = getUsers();

    // Find the full user record (session object doesn't store the password)
    const record = users.find((u) => u.email === user.email);

    if (!record) {
      return "Could not find your account. Please log out and back in.";
    }

    // Verify current password matches what is stored
    if (record.password !== currentPassword) {
      return "Current password is incorrect.";
    }

    // Prevent reusing the same password
    if (currentPassword === newPassword) {
      return "New password must be different from your current password.";
    }

    // Save the new password into the users list
    const updated = users.map((u) =>
      u.email === user.email ? { ...u, password: newPassword } : u,
    );
    saveUsers(updated);

    return null; // null = success
  };

  // ── LOGOUT ──────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    saveAuthUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        register,
        login,
        logout,
        updateName,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
