import { useState } from "react";
import { products } from "../../data/product";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import ProductCard from "../../components/Products/FeaturedProductCard";
import { useCart } from "../../contexts/CartContext";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <p className="text-gray-500">ID searched: {id}</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 text-blue-600 underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setQuantity(numValue);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-text hover:text-blue-600 mb-8 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5  transition-transform group-hover:-translate-x-1" />
        <span className="font-medium ">Back to Products</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className=" w-full h-fit rounded-2xl overflow-hidden bg-section">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-text mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-yellow-400">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-text/70 font-medium">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-text mb-8">
            ₦{product.price.toLocaleString()}
          </div>

          <div className="border-t border-b border-gray-100 py-8 mb-8">
            <h4 className="font-bold text-text mb-3">Description</h4>
            <p className="text-text/70 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2 bg-background">
              <span className="mr-6 font-bold text-text/70">Quantity:</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-text hover:text-blue-600 transition-colors"
              >
                <Minus size={18} />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={() => {
                  if (quantity === "" || quantity < 1) setQuantity(1);
                }}
                className="w-12 text-center font-bold text-lg text-text bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={() => setQuantity(Math.max(1, quantity + 1))}
                className="p-1 text-text hover:text-blue-600 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 min-w-50 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200/10"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button className="p-4 border border-gray-200 rounded-xl hover:bg-section transition-colors text-text/70 hover:text-red-500">
              <Heart size={24} />
            </button>
          </div>
        </div>
      </div>

      <section className="border-t border-gray-100 pt-16">
        <h2 className="text-3xl font-bold text-text mb-10 text-center md:text-left">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
