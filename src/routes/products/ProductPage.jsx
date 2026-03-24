import { useState, useMemo, useEffect } from "react";
import { products } from "../../data/product";
import { getCategoryCounts } from "../../utils/getCategoryCounts";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "../../components/Products/FeaturedProductCard";
import { SlidersHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

function ProductPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All Products",
  );
  const [priceRange, setPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState("Featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categoryCounts = getCategoryCounts(products);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All Products") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (priceRange !== "All Prices") {
      if (priceRange === "Under #50,000")
        result = result.filter((product) => product.price < 50000);
      if (priceRange === "#50,000 - #100,000")
        result = result.filter(
          (product) => product.price >= 50000 && product.price <= 100000,
        );
      if (priceRange === "Over #100,000")
        result = result.filter((product) => product.price > 100000);
    }

    if (sortBy === "Price: Low to High")
      result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low")
      result.sort((a, b) => b.price - a.price);
    if (sortBy === "Highest Rated") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text">All Products</h1>
        <p className="text-text/70 mt-2">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 w-full">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-background border border-gray-200 text-text px-4 py-2 rounded-lg mb-4"
          >
            <SlidersHorizontal size={20} /> Filters
          </button>

          <div
            className={`${isMobileFilterOpen ? "block" : "hidden"} lg:block`}
          >
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-text bg-background border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-text/70">
              No products found matching these filters.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductPage;
