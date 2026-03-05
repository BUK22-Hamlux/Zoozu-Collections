import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

function FeaturedProductCard({ product }) {
  const { addToCart } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-background space-y-2 p-4 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
        <p className="text-xs text-text/70">{product.category}</p>
        <h3 className="text-text text-lg font-semibold truncate">
          {product.name}
        </h3>
        <p className="text-yellow-500">
          ★ <span className="text-text/70">{product.rating}</span>
        </p>
        <div className="flex justify-between text-center">
          <h3 className="text-text font-bold">
            {formatCurrency(product.price)}
          </h3>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-blue-500 rounded-xl hover:bg-blue-600 cursor-pointer"
          >
            <ShoppingCart className="text-white size-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedProductCard;
