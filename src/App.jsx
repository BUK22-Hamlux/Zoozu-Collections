import LandingPage from "./routes/landing/LandingPage";
import ProductPage from "./routes/products/ProductPage";
import CategoriesPage from "./routes/categories/CategoriesPage";
import RegisterPage from "./routes/auth/RegisterPage";
import LoginPage from "./routes/auth/LoginPage";
import ProductDetail from "./routes/products/ProductDetailedPage";
import RootLayout from "./components/Layout/RootLayout";
import { CartProvider } from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./routes/dashboard/DashboardPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>,
    ),
  );
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
