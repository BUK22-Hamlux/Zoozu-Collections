import { ArrowRight } from "lucide-react";
import CategoryGrid from "../../components/Category/CategoryGrid";
import { NavLink } from "react-router-dom";

function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text">Shop by Category</h1>
        <p className="text-text/70 mt-2">
          Explore our wide range of product categories
        </p>
      </div>

      <CategoryGrid />

      <div className=" mt-12 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 py-16 px-8 text-center shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 opacity-90">
              Browse all our products or use the search to find exactly what you
              need.
            </p>

            <NavLink
              to={"/products"}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-blue-50 hover:shadow-lg active:scale-95"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
