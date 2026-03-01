import toast from "react-hot-toast";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const register = (userData) => {
    setUser({ name: userData.fullName, email: userData.email });
    toast.success("Registration successful");
  };

  const login = (userData) => {
    setUser({ email: userData.email, password: userData.password });
    toast.success("Login successful");
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const handleProfileInfo = (field) => (e) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success("image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("error uploading image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // clear error when typing
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        loggedIn,
        logout,
        handleProfileInfo,
        personalInfo,
        handleImageChange,
        profileImage,
        isUploadingImage,
        passwords,
        setPasswords,
        setErrors,
        errors,
        handlePasswordChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
