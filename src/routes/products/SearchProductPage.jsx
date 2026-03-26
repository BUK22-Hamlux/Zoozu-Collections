import { useSearchParams, useNavigate } from "react-router-dom";
import { products } from "../../data/product";
import FeaturedProductCard from "../../components/Products/FeaturedProductCard";
import { SearchX, ArrowLeft } from "lucide-react";
import Button from "../../components/Common/Button";

function SearchProductPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query),
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="mb-8 border-b border-border-main pb-4">
        <h2 className="font-bold text-2xl text-text">
          {query ? `Search results for: "${query}"` : "Our Collection"}
        </h2>
        <p className="text-secondary mt-1">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="bg-section p-6 rounded-full mb-6">
            <SearchX size={64} className="text-secondary opacity-50" />
          </div>
          <h3 className="text-2xl font-bold text-text mb-2">
            No matches found
          </h3>
          <p className="text-secondary max-w-md mb-8">
            We couldn't find anything matching{" "}
            <span className="font-semibold text-text">"{query}"</span>. Try
            checking your spelling or using more general terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              text="Clear Search"
              onClick={() => navigate("/products")}
              optionalClassName="px-8 bg-background hover:bg-section border border-text/10"
            />
            <Button
              text="Go Back "
              icon={<ArrowLeft />}
              onClick={() => navigate(-1)}
              type="primary"
              optionalClassName="px-8 flex flex-row-reverse gap-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchProductPage;
