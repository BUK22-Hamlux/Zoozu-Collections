import LandingPage from "./routes/landing/LandingPage";
import ProductPage from "./routes/products/ProductPage";
import CategoriesPage from "./routes/categories/CategoriesPage";
import RegisterPage from "./routes/auth/RegisterPage";
import LoginPage from "./routes/auth/LoginPage";
import ProductDetail from "./routes/products/ProductDetailedPage";
import AppProvider from "./AppProvider";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./routes/dashboard/DashboardPage";
import OrderHistoryPage from "./routes/orders/OrderHistoryPage";
import CartPage from "./routes/cart/CartPage";
import SearchProductPage from "./routes/products/SearchProductPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ProfilePage from "./routes/profile/ProfilePage";
import CheckoutPage from "./routes/checkout/CheckoutPage";
import Shipping from "./routes/checkout/sections/Shipping";
import Payment from "./routes/checkout/sections/Payment";
import Review from "./routes/checkout/sections/Review";
import NotFound from "./routes/NotFound";
import OrderConfirmationPage from "./routes/orders/OrderConfirmationPage";
import WishlistPage from "./routes/wishlist/WishlistPage";
import ContactPage from "./routes/support/ContactPage";
import ShippingInfoPage from "./routes/support/ShippingInfoPage";
import ReturnsPage from "./routes/support/ReturnsPage";
import FAQPage from "./routes/support/FAQPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppProvider />}>
      <Route index element={<LandingPage />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="product" element={<SearchProductPage />} />

      <Route element={<PublicRoute />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="wishlist" element={<WishlistPage />} />

        <Route path="checkout" element={<CheckoutPage />}>
          <Route index element={<Navigate to="shipping" replace />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="payment" element={<Payment />} />
          <Route path="review" element={<Review />} />
        </Route>
      </Route>

      {/* Public support pages — accessible without login */}
      <Route path="contact" element={<ContactPage />} />
      <Route path="shipping" element={<ShippingInfoPage />} />
      <Route path="returns" element={<ReturnsPage />} />
      <Route path="faq" element={<FAQPage />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
