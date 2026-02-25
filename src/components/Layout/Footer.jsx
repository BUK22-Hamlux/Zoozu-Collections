import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gray-100 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img className="w-20 h-fit" src="../../../public/logo.png" />
            </div>
            <p className="text-text/50 leading-relaxed max-w-xs">
              Your one-stop shop for all your needs. Quality Fashion wears.
            </p>
            <div className="flex gap-5 text-tex/50">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" />
              <Github className="w-5 h-5 cursor-pointer hover:text-text transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6 uppercase tracking-wider text-sm">
              Shop
            </h4>
            <ul className="flex flex-col gap-3 text-text/50">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                All Products
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Categories
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                New Arrivals
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Best Sellers
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6 uppercase tracking-wider text-sm">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3 text-text/50">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Shipping Info
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Returns
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                FAQ
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold text-text mb-6 uppercase tracking-wider text-sm">
              Newsletter
            </h4>
            <p className="text-text/50 mb-4 text-sm">
              Subscribe to get special offers and updates.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full text-text px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98]">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
