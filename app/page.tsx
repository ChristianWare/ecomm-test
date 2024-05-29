import CollectionsSection from "@/components/CollectionsSection/CollectionsSection";
import Hero from "@/components/Hero/Hero";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <LayoutWrapper>
        <Hero />
        <CollectionsSection />
        <ProductsSection />
      </LayoutWrapper>
    </div>
  );
}
