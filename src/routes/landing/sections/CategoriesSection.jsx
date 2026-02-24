import CategoryGrid from "../../../components/Category/CategoryGrid";

function CategoriesSection() {
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

      <CategoryGrid />
    </section>
  );
}

export default CategoriesSection;
