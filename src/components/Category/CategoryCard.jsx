import React from "react";

// Assuming your product.js passes 'image' along with name and count
function CategoryCard({ name, count, image }) {
  return (
    <div className="group relative h-80 w-full overflow-hidden rounded-2xl cursor-pointer shadow-md">
      {/* Background Image with Hover Zoom */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* The Dark "Vignette" Gradient Overlay */}
      {/* This ensures the white text is readable regardless of the image brightness */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Text Content Layer */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight leading-tight">
          {name}
        </h3>
        <p className="mt-1 text-sm font-medium opacity-80">{count} products</p>
      </div>
    </div>
  );
}

export default CategoryCard;
