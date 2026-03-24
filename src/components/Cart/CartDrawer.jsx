import Overlay from "../Common/Overlay";
import { X } from "lucide-react";
import ListItemsInCart from "./CartItems";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useRef } from "react";

function CartView({ onClose }) {
  const { totalCartCount } = useCart();
  const closeButtonRef = useRef(null);

  // Close on Escape key — keyboard users expect this for any modal/dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Move focus to the close button when the drawer opens.
  // Without this, keyboard focus stays wherever it was on the page
  // and the user has to Tab many times before reaching the drawer.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 h-screen z-51 flex justify-end">
      {/* aria-hidden on the overlay — it's visual only */}
      <Overlay onClose={onClose} aria-hidden="true" />

      {/*
        role="dialog" tells screen readers this is a modal dialog.
        aria-modal="true" tells them to ignore content behind the overlay.
        aria-labelledby points to the <h2> heading inside — that becomes
        the dialog's announced name, e.g. "Shopping Cart, dialog".
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="w-full sm:w-1/2 md:1/3 h-screen bg-background flex flex-col z-51 shadow-lg"
      >
        <div className="flex justify-between items-center px-4 py-8 text-text/70 border-b border-text/50">
          {/* id="cart-drawer-title" matches aria-labelledby above */}
          <h2 id="cart-drawer-title" className="font-semibold text-lg">
            Shopping Cart
          </h2>

          {/* The close button must be a real <button> with a clear aria-label.
              "X" alone means nothing to a screen reader. */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close shopping cart"
            className="p-1 rounded hover:bg-section transition-colors"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="h-full flex flex-col overflow-hidden">
          {totalCartCount === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <ListItemsInCart onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartView;
