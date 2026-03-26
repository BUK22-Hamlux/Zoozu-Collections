import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { OrdersProvider } from "./contexts/OrdersProvider";
import { Toaster } from "react-hot-toast";
import RootLayout from "./components/Layout/RootLayout";

function AppProvider() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RootLayout />
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default AppProvider;
