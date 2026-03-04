import { useNavigate } from "react-router-dom";
import { MapPin, Mail, User, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileInput from "../../../components/Profile/ProfileInput";
import Button from "../../../components/Common/Button";
import { useInfo } from "../../../contexts/InfoContext";
import useFormValidation from "../../../hooks/useFormValidation";
import { required, email, minLength } from "../../../utils/validationRules";

function Shipping() {
  const navigate = useNavigate();
  const { personalInfo, shippingInfo, setShippingInfo } = useInfo();

  const validationRules = {
    fullName: [required("full name")],
    email: [required("email"), email()],
    phone: [required("phone number"), minLength(8)],
    address: [required("address")],
    city: [required("city")],
    state: [required("state")],
    zip: [required("zip code"), minLength(5)],
  };

  const { values, errors, handleChange, validate, setFormValues } =
    useFormValidation(
      {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      validationRules,
    );

  useEffect(() => {
    if (personalInfo) {
      setFormValues({
        fullName: personalInfo.fullName || "",
        email: personalInfo.email || "",
      });
    }
  }, []);
  useEffect(() => {
    if (shippingInfo) {
      setFormValues(shippingInfo);
    }
  }, [shippingInfo]);

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validate()) return;
    setShippingInfo(values);
    navigate("/checkout/payment");
  };

  return (
    <div className="bg-section border border-border-main rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border-main">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <MapPin size={24} />
        </div>
        <h2 className="text-xl font-bold text-text">Shipping Information</h2>
      </div>

      <form onSubmit={handleContinue} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput
            name="fullName"
            label="Full Name *"
            icon={User}
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <ProfileInput
            name="email"
            label="Email Address *"
            type="email"
            icon={Mail}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <ProfileInput
          name="phone"
          label="Phone Number *"
          icon={Phone}
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <ProfileInput
          name="address"
          label="Street Address *"
          icon={MapPin}
          value={values.address}
          onChange={handleChange}
          error={errors.address}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileInput
            name="city"
            label="City *"
            value={values.city}
            onChange={handleChange}
            error={errors.city}
          />
          <ProfileInput
            name="state"
            label="State *"
            value={values.state}
            onChange={handleChange}
            error={errors.state}
          />
          <ProfileInput
            name="zip"
            label="ZIP Code *"
            value={values.zip}
            onChange={handleChange}
            error={errors.zip}
          />
        </div>

        <Button
          text="Continue to Payment"
          type="primary"
          optionalClassName="w-full py-4 text-lg font-semibold mt-4"
        />
      </form>
    </div>
  );
}

export default Shipping;
