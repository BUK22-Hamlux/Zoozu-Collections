import PageLayout from "../../components/Layout/PageLayout";
import HeroSection from "./sections/HeroSection";
import FeaturedProducts from "./sections/FeaturedProducts";
import CategoriesSection from "./sections/CategoriesSection";
import BenefitsSection from "./sections/BenefitSection";
import CommunitySection from "./sections/CommunitySection";

function LandingPage() {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <BenefitsSection />
      <CommunitySection />
    </PageLayout>
  );
}

export default LandingPage;
