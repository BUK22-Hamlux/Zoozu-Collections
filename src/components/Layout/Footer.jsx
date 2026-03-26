import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gray-100 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                className="w-20 h-fit"
                src="/logo.png"
                loading="lazy"
                width={80}
                height={27}
                alt="Zoozu Collections logo"
              />
            </div>
            <p className="text-text/50 leading-relaxed max-w-xs">
              Your one-stop shop for all your needs. Quality Fashion wears.
            </p>

            <div className="flex gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
              >
                <Facebook
                  className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
              >
                <Twitter
                  className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
              >
                <Instagram
                  className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub page"
              >
                <Github
                  className="w-5 h-5 cursor-pointer hover:text-text transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6 uppercase tracking-wider text-sm">
              Shop
            </h4>

            <ul className="flex flex-col gap-3 text-text/50">
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className="hover:text-blue-600 transition-colors"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-blue-600 transition-colors"
                >
                  New Arrivals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-blue-600 transition-colors"
                >
                  Best Sellers
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6 uppercase tracking-wider text-sm">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3 text-text/50">
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shipping"
                  className="hover:text-blue-600 transition-colors"
                >
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/returns"
                  className="hover:text-blue-600 transition-colors"
                >
                  Returns
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faq"
                  className="hover:text-blue-600 transition-colors"
                >
                  FAQ
                </NavLink>
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
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="w-full text-text px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Zoozu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
