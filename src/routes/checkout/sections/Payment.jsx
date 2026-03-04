import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard as CardIcon, Apple, Landmark } from "lucide-react";
import ProfileInput from "../../../components/Profile/ProfileInput";
import Button from "../../../components/Common/Button";
import PaymentMethod from "../../../components/checkout/PaymentMethod";
import useFormValidation from "../../../hooks/useFormValidation";
import {
  required,
  cardNumber,
  cvv,
  expiryDate,
} from "../../../utils/validationRules";

function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");

  const validationRules = {
    cardNumber: [required("card number"), cardNumber()],
    cardName: [required("card name")],
    expiryDate: [required("expiry date"), expiryDate()],
    cvv: [required("cvv"), cvv()],
  };
  const { values, errors, handleChange, validate } = useFormValidation(
    {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    validationRules,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    navigate("/checkout/review");
  };

  return (
    <div className="bg-section border border-border-main rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border-main">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <CardIcon size={24} />
        </div>
        <h2 className="text-xl font-bold text-text">Payment Method</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <PaymentMethod
          active={method === "card"}
          onClick={() => setMethod("card")}
          icon={<CardIcon size={20} />}
          label="Credit Card"
        />
        <PaymentMethod
          active={method === "paypal"}
          onClick={() => setMethod("paypal")}
          icon={<Landmark size={20} className="text-[#0070ba]" />}
          label="PayPal"
        />
        <PaymentMethod
          active={method === "apple"}
          onClick={() => setMethod("apple")}
          icon={<Apple size={20} />}
          label="Apple Pay"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {method === "card" ? (
          <>
            <ProfileInput
              label="Card Number *"
              placeholder="1234 5678 9012 3456"
              name="cardNumber"
              value={values.cardNumber}
              error={errors.cardNumber}
              onChange={handleChange}
            />
            <ProfileInput
              label="Cardholder Name *"
              placeholder="John Doe"
              name="cardName"
              value={values.cardName}
              error={errors.cardName}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-6">
              <ProfileInput
                label="Expiry Date *"
                placeholder="MM/YY"
                name="expiryDate"
                value={values.expiryDate}
                error={errors.expiryDate}
                onChange={handleChange}
              />
              <ProfileInput
                value={values.cvv}
                label="CVV *"
                placeholder="123"
                name="cvv"
                error={errors.cvv}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="save"
                className="w-4 h-4 accent-primary"
              />
              <label
                htmlFor="save"
                className="text-sm text-secondary flex items-center gap-2"
              >
                Save card for future purchases
              </label>
            </div>
          </>
        ) : (
          <div className="py-10 text-center border-2 border-dashed border-border-main rounded-xl">
            <p className="text-secondary">
              You will be redirected to{" "}
              {method === "paypal" ? "PayPal" : "Apple Pay"} to complete your
              purchase safely.
            </p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            text="Back"
            type="secondary"
            onClick={() => navigate(-1)}
            optionalClassName="flex-1 py-4 border hover:bg-background border-border-main"
          />
          <Button
            text="Review Order"
            type="primary"
            optionalClassName="flex-[2] py-4 text-lg font-bold"
          />
        </div>
      </form>
    </div>
  );
}

export default Payment;
