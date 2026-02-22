import { ArrowRight } from "lucide-react";
import { products } from "../../../data/product";
import FeaturedProductCard from "../../../components/Products/FeaturedProductCard";
import React from "react";
import { NavLink } from "react-router-dom";

function FeaturedProducts() {
  return (
    <section className="py-12 px-4 bg-section flex flex-col items-center">
      <div className="flex justify-center sm:justify-between mb-8 items-center w-full max-w-7xl">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-4xl text-text font-bold ">
            Featured Products
          </h2>
          <p className="text-text/70">Discover our most popular products</p>
        </div>

        <NavLink
          to="/products"
          className="hidden sm:inline-block text-blue-700 mb-8 cursor-pointer  hover:underline"
        >
          View all {<ArrowRight className="inline-block ml-1" />}
        </NavLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.slice(0, 5).map((product) => (
          <div key={product.id}>
            <FeaturedProductCard
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          </div>
        ))}
      </div>
      <NavLink
        to="/products"
        className="block sm:hidden text-center text-blue-700 mt-8 cursor-pointer hover:underline"
      >
        View all products
      </NavLink>
    </section>
  );
}

export default FeaturedProducts;
