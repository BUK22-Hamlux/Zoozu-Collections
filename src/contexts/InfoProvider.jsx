import { useState } from "react";
import { InfoContext } from "./InfoContext";
import toast from "react-hot-toast";

export function InfoProvider({ children }) {
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

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
  return (
    <InfoContext.Provider
      value={{
        handleProfileInfo,
        personalInfo,
        handleImageChange,
        profileImage,
        isUploadingImage,
        passwords,
        setPasswords,
        setErrors,
        errors,
        shippingInfo,
        setShippingInfo,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}
