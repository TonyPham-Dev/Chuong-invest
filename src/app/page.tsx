import AboutCompany from "@/components/AboutCompany";
import CallToAction from "@/components/CallToAction";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCategories from "@/components/ProductCategories";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutCompany />
        <ProductCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
