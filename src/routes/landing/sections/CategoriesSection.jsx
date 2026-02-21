import CategoryCard from "../../../components/Category/CategoryCard";
import { products } from "../../../data/product";
import { categories } from "../../../data/categories";
import { getCategoryCounts } from "../../../utils/getCategoryCounts";

function CategoriesSection() {
  const categoryCounts = getCategoryCounts(products);

  return (
    <section
      id="categories"
      className="py-12 bg-background px-4 flex flex-col items-center"
    >
      <h2 className="text-2xl sm:text-4xl text-text font-bold">
        Shop by Categories
      </h2>
      <p className="text-text mb-8 text-center">
        Find exactly what you're looking for
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            count={categoryCounts[category.name] || 0}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
