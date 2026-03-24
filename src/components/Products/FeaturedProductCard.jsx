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
    <Link
      to={`/products/${product.id}`}
      className="group block"
      // aria-label on the link gives screen readers the full context:
      // without it they just hear the image alt + all the child text in one go
      aria-label={`View details for ${product.name}`}
    >
      <div className="bg-background space-y-2 p-4 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={`${product.name} – ${product.category}`}
          // loading="lazy" — only download images as they scroll into view
          loading="lazy"
          // width/height prevent layout shift (CLS) while the image loads
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
        <p className="text-xs text-text/70">{product.category}</p>
        <h3 className="text-text text-lg font-semibold truncate">
          {product.name}
        </h3>

        {/* aria-label on the rating replaces the raw "★ 4.5" that a screen
            reader would announce as "star 4.5" — not useful. */}
        <p
          className="text-yellow-500"
          aria-label={`Rating: ${product.rating} out of 5`}
        >
          <span aria-hidden="true">★</span>{" "}
          <span className="text-text/70">{product.rating}</span>
        </p>

        <div className="flex justify-between text-center">
          <h3 className="text-text font-bold">
            {formatCurrency(product.price)}
          </h3>
          <button
            onClick={handleAddToCart}
            // aria-label tells screen readers exactly what this button does
            // and for which product — without it they hear "button" with no context
            aria-label={`Add ${product.name} to cart`}
            className="p-2 bg-blue-500 rounded-xl hover:bg-blue-600 cursor-pointer"
          >
            <ShoppingCart className="text-white size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedProductCard;
