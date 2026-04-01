import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">My Wishlist</h1>
        <p className="text-text/60 mt-1">
          {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-section p-6 rounded-full mb-5">
            <Heart
              size={48}
              className="text-secondary opacity-40"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-secondary mb-6 max-w-xs">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link
            to="/products"
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-section border border-text/10 rounded-xl overflow-hidden group"
            >
              <Link to={`/products/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={`${product.name} – ${product.category}`}
                  loading="lazy"
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-4">
                <p className="text-xs text-text/50 mb-1">{product.category}</p>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-text hover:text-primary transition-colors truncate">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-bold text-text mt-1 mb-4">
                  {formatCurrency(product.price)}
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:brightness-110 transition-all"
                  >
                    <ShoppingCart size={15} aria-hidden="true" />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="p-2 border border-text/10 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors text-text/50"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
