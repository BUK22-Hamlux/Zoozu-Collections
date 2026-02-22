import LandingPage from "./routes/landing/LandingPage";
import ProductPage from "./routes/products/ProductPage";
import RootLayout from "./components/Layout/RootLayout";
import ProductDetail from "./routes/products/ProductDetailedPage";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
