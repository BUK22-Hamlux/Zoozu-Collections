import React from "react";

function FeaturedProductCard({ name, price, image, rating, category }) {
  return (
    <div className="bg-background space-y-2 p-4 rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md "
      />
      <p className="text-xs text-text/70">{category}</p>
      <h3 className="text-text text-lg font-semibold">{name}</h3>
      <p className="text-yellow-500">
        ★ <span className="text-text/70">{rating}</span>
      </p>
      <h3 className="text-text font-bold">#{price}</h3>
    </div>
  );
}

export default FeaturedProductCard;
