import { products } from "../../data/product";
import { getCategoryCounts } from "../../utils/getCategoryCounts";
import { categories } from "../../data/categories";
import CategoryCard from "../../components/Category/CategoryCard";

function CategoryGrid() {
  const categoryCounts = getCategoryCounts(products);
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            count={categoryCounts[category.name] || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
