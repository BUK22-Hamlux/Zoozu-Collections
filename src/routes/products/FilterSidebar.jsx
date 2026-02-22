import React from "react";
import { SlidersHorizontal } from "lucide-react";

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  priceRange,
  setPriceRange,
}) => {
  const categoriesList = ["All Products", ...Object.keys(categoryCounts)];
  const priceOptions = [
    "All Prices",
    "Under #50,000",
    "#50,000 - #100,000",
    "Over #100,000",
  ];

  return (
    <div className="bg-section border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-6 font-bold text-text">
        <SlidersHorizontal size={18} /> Filters
      </div>

      {/* Category Section */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 text-text">Category</h4>
        <div className="space-y-3">
          {categoriesList.map((cat) => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span
                className={`ml-3 text-sm transition-colors ${selectedCategory === cat ? "text-blue-600 font-medium" : "text-text group-hover:text-text/80"}`}
              >
                {cat}{" "}
                {cat !== "All Products" && `(${categoryCounts[cat] || 0})`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h4 className="font-semibold mb-4 text-text">Price Range</h4>
        <div className="space-y-3">
          {priceOptions.map((range) => (
            <label
              key={range}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                checked={priceRange === range}
                onChange={() => setPriceRange(range)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span
                className={`ml-3 text-sm transition-colors ${priceRange === range ? "text-blue-600 font-medium" : "text-text group-hover:text-text/80"}`}
              >
                {range}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
