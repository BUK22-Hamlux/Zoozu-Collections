import { useState, useMemo, useEffect } from "react";
import { products } from "../../data/product";
import { getCategoryCounts } from "../../utils/getCategoryCounts";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "../../components/Products/FeaturedProductCard";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const PRODUCTS_PER_PAGE = 8;

function ProductPage() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All Products",
  );
  const [priceRange, setPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState("Featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryCounts = getCategoryCounts(products);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (priceRange === "Under ₦50,000")
      result = result.filter((p) => p.price < 50000);
    else if (priceRange === "₦50,000 - ₦100,000")
      result = result.filter((p) => p.price >= 50000 && p.price <= 100000);
    else if (priceRange === "Over ₦100,000")
      result = result.filter((p) => p.price > 100000);

    if (sortBy === "Price: Low to High")
      result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low")
      result.sort((a, b) => b.price - a.price);
    if (sortBy === "Highest Rated") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  // pagination for my products page
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2)
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text">All Products</h1>
        <p className="text-text/70 mt-2">
          Showing {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)}{" "}
          of {filteredProducts.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter sidebar */}
        <aside className="lg:w-64 w-full">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-background border border-gray-200 text-text px-4 py-2 rounded-lg mb-4"
            aria-expanded={isMobileFilterOpen}
            aria-controls="filter-sidebar"
          >
            <SlidersHorizontal size={20} aria-hidden="true" />
            Filters
          </button>

          <div
            id="filter-sidebar"
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
          {/* Sort dropdown */}
          <div className="flex justify-end mb-6">
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
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

          {/* Product grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-text/70">
              No products found matching these filters.
            </div>
          )}

          {/* Pagination — only rendered when there are multiple pages */}
          {totalPages > 1 && (
            <nav
              aria-label="Product pages"
              className="flex items-center justify-center gap-2 mt-12"
            >
              {/* Previous button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-2 rounded-lg border border-border-main text-text hover:bg-section transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>

              {/* Page number buttons */}
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => goToPage(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "border border-border-main text-text hover:bg-section"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-2 rounded-lg border border-border-main text-text hover:bg-section transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductPage;
