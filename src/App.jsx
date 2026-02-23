import LandingPage from "./routes/landing/LandingPage";
import ProductPage from "./routes/products/ProductPage";
import RootLayout from "./components/Layout/RootLayout";
import { CartProvider } from "./contexts/CartProvider";
import ProductDetail from "./routes/products/ProductDetailedPage";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Route>,
    ),
  );
  return (
    <CartProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
