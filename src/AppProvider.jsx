import { useEffect, useState } from "react";
import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { OrdersProvider } from "./contexts/OrdersProvider";
import { WishlistProvider } from "./contexts/WishlistProvider";
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import RootLayout from "./components/Layout/RootLayout";

function AuthGuard() {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        aria-label="Loading"
        role="status"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary"
              style={{
                animation: "zoozu-bounce 0.6s ease-in-out infinite alternate",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes zoozu-bounce {
            from { transform: translateY(0); opacity: 1; }
            to   { transform: translateY(-8px); opacity: 0.4; }
          }
        `}</style>
      </div>
    );
  }

  return <RootLayout />;
}

function AppProvider() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <AuthGuard />
          </CartProvider>
        </WishlistProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default AppProvider;
