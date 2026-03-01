import { useState, useEffect } from "react";
import Button from "../Common/Button";
import SearchForm from "../Common/SearchForm";
import {
  X,
  Menu,
  Moon,
  Sun,
  ShoppingCart,
  User,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import CartView from "../Cart/CartDrawer";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { loggedIn, logout } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "light",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { totalCartCount } = useCart();
  const [openCartModal, setOpenCartModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-background border-b border-border-main flex items-center justify-between p-3 md:px-8 text-text">
      <div className="flex items-center gap-8">
        {loggedIn ? (
          <NavLink to="/dashboard" className="" title="dashboard">
            <LayoutDashboard />
          </NavLink>
        ) : (
          <NavLink to="/" className="">
            <img className="w-20 h-fit" src="/logo.png" />
          </NavLink>
        )}

        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="products"
            className="hover:text-primary transition-colors"
          >
            Products
          </NavLink>
          <NavLink
            to="categories"
            className="hover:text-primary transition-colors"
          >
            Categories
          </NavLink>
        </div>
      </div>

      <div className="hidden md:block flex-1 max-w-md mx-8">
        <SearchForm />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          title="theme"
          onClick={toggleTheme}
          className="p-2 hover:bg-section rounded-full transition-colors text-text hidden md:inline-block"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => setOpenCartModal(true)}
          title="cart"
          className="relative p-2 hover:bg-section rounded-full transition-colors cursor-pointer"
        >
          <ShoppingCart size={20} />
          <span
            className={`absolute ${totalCartCount <= 0 ? "hidden" : "flex"} top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-background`}
          >
            {totalCartCount}
          </span>
        </button>

        {openCartModal && <CartView onClose={() => setOpenCartModal(false)} />}

        {loggedIn ? (
          <NavLink to={"profile"} className="block" title="profile">
            <User />
          </NavLink>
        ) : (
          <NavLink to={"login"} className="hidden md:block">
            <Button
              text="Sign In"
              type="primary"
              optionalClassName="text-sm font-semibold px-5"
            />
          </NavLink>
        )}

        {/* mobile view for navbar*/}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-section rounded-lg"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed top-15 left-0 w-full bg-background border-b border-border-main p-4 flex flex-col gap-4 z-50 md:hidden shadow-xl"
            >
              <SearchForm
                className="w-full"
                onSearchSuccess={() => setIsMenuOpen(false)}
              />

              <div className="flex flex-col gap-1">
                <NavLink
                  to="products"
                  className="p-3 text-base font-medium hover:bg-section rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  Products
                </NavLink>
                <NavLink
                  to="categories"
                  className="p-3 text-base font-medium hover:bg-section rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  Categories
                </NavLink>
                <button
                  onClick={toggleTheme}
                  className="p-3 hover:bg-section rounded-lg font-medium transition-colors text-text"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <div className="flex items-center gap-2">
                      <Sun size={20} /> <p>Dark Mode</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Moon size={20} /> <p>Light Mode</p>
                    </div>
                  )}
                </button>
              </div>
              {loggedIn ? (
                <NavLink to={"login"}>
                  <Button
                    text="logout"
                    type="NotPrimary"
                    optionalClassName="w-full py-3 font-bold bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      toggleMenu();
                      logout();
                    }}
                  />
                </NavLink>
              ) : (
                <NavLink to={"login"}>
                  <Button
                    text="Sign In"
                    type="primary"
                    optionalClassName="w-full py-3 font-bold"
                    onClick={toggleMenu}
                  />
                </NavLink>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
