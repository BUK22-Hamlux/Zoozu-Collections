import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { OrdersProvider } from "./contexts/OrdersProvider";
import { Toaster } from "react-hot-toast";
import RootLayout from "./components/Layout/RootLayout";
import { InfoProvider } from "./contexts/InfoProvider";

function AppProvider() {
  return (
    <AuthProvider>
      <InfoProvider>
        <OrdersProvider>
          <CartProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <RootLayout />
          </CartProvider>
        </OrdersProvider>
      </InfoProvider>
    </AuthProvider>
  );
}

export default AppProvider;
