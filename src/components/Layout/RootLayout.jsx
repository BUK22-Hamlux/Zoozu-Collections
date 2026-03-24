import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../Common/ScrollToTop";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      {/* Skip-to-content: lets keyboard users jump straight to page content,
          bypassing the navbar on every page. It's visually hidden until focused. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
