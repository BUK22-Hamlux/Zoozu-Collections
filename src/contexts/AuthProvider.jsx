import toast from "react-hot-toast";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  getUsers,
  saveUsers,
  getAuthUser,
  saveAuthUser,
} from "../storage/userStorage";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getAuthUser());

  const loggedIn = !!user;

  // REGISTER
  const register = (userData) => {
    const users = getUsers();

    const userExists = users.find((u) => u.email === userData.email);

    if (userExists) {
      toast.error("User already exists");
      return false;
    }

    const newUser = {
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    const authUser = { name: newUser.name, email: newUser.email };
    setUser(authUser);
    saveAuthUser(authUser);

    toast.success("Registration successful");
    return true;
  };
  //  LOGIN
  const login = (userData) => {
    const users = getUsers();

    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password,
    );

    if (!user) {
      toast.error("Invalid email or password");
      return false;
    }

    const authUser = { name: user.name, email: user.email };

    setUser(authUser);
    saveAuthUser(authUser);

    toast.success("Login successful");
    return true;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    saveAuthUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
