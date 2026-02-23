import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

function FeaturedProductCard({
  name,
  price,
  image,
  rating,
  category,
  id,
  onClick,
}) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onClick({ name, price, image, rating, category, id });
  };

  return (
    <NavLink to={`/products/${id}`} className="group block">
      <div className="bg-background space-y-2 p-4 rounded-lg shadow-md">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
        <p className="text-xs text-text/70">{category}</p>
        <h3 className="text-text text-lg font-semibold">{name}</h3>
        <p className="text-yellow-500">
          ★ <span className="text-text/70">{rating}</span>
        </p>
        <div className="flex justify-between text-center">
          <h3 className="text-text font-bold">₦{price}</h3>
          <div
            onClick={handleAddToCart}
            className="p-2 bg-blue-500 rounded-xl hover:bg-blue-600 cursor-pointer"
          >
            <ShoppingCart className="text-white size-5" />
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default FeaturedProductCard;
