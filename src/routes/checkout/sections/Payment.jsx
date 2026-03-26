import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard as CardIcon,
  Apple,
  Landmark,
  Lock,
  AlertCircle,
} from "lucide-react";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import PaymentMethod from "../../../components/Checkout/PaymentMethod";
import useFormValidation from "../../../hooks/useFormValidation";
import {
  required,
  cvv,
  cardNumberRule,
  expiryRule,
} from "../../../utils/validationRules";
import luhnCheck from "../../../utils/luhnCheck";

function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");

  const validationRules = {
    cardNumber: [required("card number"), cardNumberRule(luhnCheck)],
    cardName: [required("cardholder name")],
    expiryDate: [required("expiry date"), expiryRule()],
    cvv: [required("CVV"), cvv()],
  };

  const { values, errors, handleChange, validate, setValue } =
    useFormValidation(
      { cardNumber: "", cardName: "", expiryDate: "", cvv: "" },
      validationRules,
    );

  // Formats as "4242 4242 4242 4242" and auto-tabs to expiry at 16 digits
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 16) return;
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setValue("cardNumber", formatted);
  };

  // Formats as "MM/YY" and auto-tabs to CVV when complete
  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 4) raw = raw.slice(0, 4);
    let formatted = raw;
    if (raw.length >= 3) {
      formatted = raw.slice(0, 2) + "/" + raw.slice(2);
    } else if (raw.length === 2 && values.expiryDate.length === 1) {
      formatted = raw + "/";
    }
    setValue("expiryDate", formatted);
  };

  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 4) return;
    setValue("cvv", raw);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method !== "card") return;
    if (!validate()) return;
    navigate("/checkout/review");
  };

  return (
    <div className="bg-section border border-border-main rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border-main">
        <div
          className="p-2 bg-primary/10 rounded-lg text-primary"
          aria-hidden="true"
        >
          <CardIcon size={24} />
        </div>
        <h2 className="text-xl font-bold text-text">Payment Method</h2>
      </div>

      <div
        className="grid grid-cols-3 gap-4 mb-8"
        role="radiogroup"
        aria-label="Select payment method"
      >
        <PaymentMethod
          active={method === "card"}
          onClick={() => setMethod("card")}
          icon={<CardIcon size={20} aria-hidden="true" />}
          label="Credit Card"
        />
        <PaymentMethod
          active={method === "paypal"}
          onClick={() => setMethod("paypal")}
          icon={
            <Landmark size={20} className="text-[#0070ba]" aria-hidden="true" />
          }
          label="PayPal"
        />
        <PaymentMethod
          active={method === "apple"}
          onClick={() => setMethod("apple")}
          icon={<Apple size={20} aria-hidden="true" />}
          label="Apple Pay"
        />
      </div>

      {/* Unavailable notice for PayPal / Apple Pay */}
      {(method === "paypal" || method === "apple") && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800"
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-sm">
              {method === "paypal" ? "PayPal" : "Apple Pay"} is not available
              yet
            </p>
            <p className="text-sm mt-1 opacity-80">
              We're working on adding this payment method. Please use a credit
              or debit card to complete your order.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {method === "card" ? (
          <>
            {/* Card Number */}
            <Input
              label="Card Number * "
              icon={CardIcon}
              value={values.cardNumber}
              placeholder="1234 5678 9012 3456"
              name="cardNumber"
              onChange={handleCardNumberChange}
              error={errors.cardNumber}
              inputId="cardNumber"
              maxLength={19}
              inputMode="numeric"
            />

            {/* Cardholder Name */}
            <Input
              label="Cardholder Name *"
              placeholder="Card Name"
              name="cardName"
              value={values.cardName}
              error={errors.cardName}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-6">
              {/* Expiry Date */}
              <Input
                label="Expiry Date * "
                value={values.expiryDate}
                placeholder="MM/YY"
                name="expiryDate"
                onChange={handleExpiryChange}
                error={errors.expiryDate}
                inputId="expiryDate"
                maxLength={5}
                inputMode="numeric"
              />

              {/* CVV */}
              <Input
                label="CVV * "
                value={values.cvv}
                placeholder="123"
                name="cvv"
                onChange={handleCvvChange}
                error={errors.cvv}
                inputId="cvv"
                maxLength={4}
                inputMode="numeric"
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="save-card"
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="save-card" className="text-sm text-secondary">
                Save card for future purchases
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs text-secondary">
              <Lock size={12} aria-hidden="true" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </>
        ) : (
          <div className="py-10 text-center border-2 border-dashed border-border-main rounded-xl opacity-50">
            <p className="text-secondary">
              Please select Credit Card above to continue
            </p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            text="Back"
            type="secondary"
            htmlType="button"
            onClick={() => navigate("/checkout/shipping")}
            optionalClassName="flex-1 py-4 border hover:bg-background border-border-main"
          />
          <Button
            text="Review Order"
            type="primary"
            htmlType="submit"
            disabled={method !== "card"}
            optionalClassName="flex-[2] py-4 text-lg font-bold"
          />
        </div>
      </form>
    </div>
  );
}

export default Payment;
