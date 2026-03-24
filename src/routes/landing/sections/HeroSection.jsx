import { NavLink } from "react-router-dom";
import Button from "../../../components/Common/Button";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative min-h-dvh w-full bg-hero bg-cover flex items-center">
      {/* aria-hidden on decorative overlays — screen readers don't need to
          know about a visual darkening div */}
      <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

      <div className="max-w-7xl relative flex flex-col items-center z-10 w-full container mx-auto px-6">
        <div className="text-center flex flex-col items-center gap-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl max-w-4xl font-extrabold text-white leading-tight">
            Discover Amazing <br /> Fashion Trends
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-lg">
            Explore the latest trends in fashion and find your perfect look with
            Zoozu.
          </p>

          <div className="flex flex-col w-full justify-center sm:flex-row gap-4">
            <NavLink to="/products">
              <Button
                text="Shop Now"
                icon={<ArrowRight aria-hidden="true" />}
                type="primary"
                optionalClassName="flex items-center justify-center gap-2"
              />
            </NavLink>

            <NavLink to="/categories">
              <Button
                text="Browse Categories"
                optionalClassName="border border-white text-white hover:bg-white/10"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
