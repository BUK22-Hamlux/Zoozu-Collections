import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../Common/ScrollToTop";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
