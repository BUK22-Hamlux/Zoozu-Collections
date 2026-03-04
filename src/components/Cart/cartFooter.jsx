import Button from "../Common/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

function CartFooter({
  mode = "cart",
  totalPrice = 0,
  totalCartCount = 0,
  shippingRate = 0.02,
  taxRate = 0.05,
  freeShippingThreshold = 100000,
  onBack,
  onAction,
  onClose,
  text,
}) {
  const navigate = useNavigate();

  const tax = totalPrice * taxRate;
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : totalPrice * shippingRate;
  const grandTotal = totalPrice + tax + shippingFee;

  return (
    <footer className="p-4 border border-text/10 rounded-2xl bg-section mt-6">
      <h2 className="text-text font-bold text-2xl mb-6">Order Summary</h2>

      <div className="text-text/70 space-y-3 mb-6">
        {mode === "cart" && (
          <div className="flex justify-between">
            <span>Total items</span>
            <span>{totalCartCount}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={isFreeShipping ? "text-green-500 font-medium" : ""}>
            {isFreeShipping ? "FREE" : formatCurrency(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({taxRate * 100}%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="flex justify-between text-text font-bold text-xl pt-4 border-t border-text/10">
        <h2>Total</h2>
        <h2>{formatCurrency(grandTotal)}</h2>
      </div>

      {!isFreeShipping && mode === "cart" && (
        <p className="text-text/70 text-sm mt-2">
          Add ₦{freeShippingThreshold - totalPrice} more to get free shipping
        </p>
      )}

      <div className="flex flex-col gap-3 mt-6">
        {mode === "cart" ? (
          <>
            <Button
              text="Checkout"
              type="primary"
              optionalClassName="w-full"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            />
            <Button
              text="Continue Shopping"
              optionalClassName="w-full bg-section hover:bg-background border border-text/10"
              onClick={() => {
                onClose();
                navigate("/products");
              }}
            />
          </>
        ) : (
          <>
            <Button
              text="back"
              type="secondary"
              optionalClassName="w-full"
              onClick={onBack}
            />
            <Button
              text={text}
              type="primary"
              optionalClassName="w-full"
              onClick={onAction}
            />
          </>
        )}
      </div>
    </footer>
  );
}

export default CartFooter;
