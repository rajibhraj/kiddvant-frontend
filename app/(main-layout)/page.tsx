import FunForAllAges from "@/components/FunForAllAges";
import HomeHero from "@/components/HomeHero";
import ProductSlider from "@/components/ProductSlider";
import ShopByCategory from "@/components/ShopByCategory";
import BestSellers from "@/components/BestSellers";
import NewsletterPromo from "@/components/NewsletterPromo";
import UpdateHero from "@/components/update/Hero";
import PopularPicksPage from "@/components/update/PopularPicks.usage";
import TestimonialsSection from "@/components/update/TestimonialsSection";
import CollectionTabs from "@/components/update/CollectionTabs";

export default function Home() {
  return (
    <div>
{/* 2. Custom Updated Hero Section */}
      <UpdateHero />

      <PopularPicksPage />
      <TestimonialsSection />
      <FunForAllAges />
      <CollectionTabs />


      {/* <HomeHero/>
      <ProductSlider/>
      <FunForAllAges/>
      <ShopByCategory/>
      <BestSellers/>
      <NewsletterPromo/> */}
    </div>
  );
}
