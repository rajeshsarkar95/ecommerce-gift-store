import Hero from "../../components/user/Hero";
import FlashDeals from "../../components/user/FlashDeals";
import PromoSection from "../../components/user/PromoBanners";
import TopSellers from "../../components/user/TopSellers";
import PopularCategories from "../../components/user/PopularCategories";
import PersonalizedGifts from "../../components/user/Personalizedgifts";
import TShirtCollection from "../../components/user/TshirtCollection";
import HoddiesCollection from "../../components/user/HoodiesCollection";
import OffersBanner from "../../components/user/OfferBanners";
import MugCollection from "../../components/user/MugCollection";
import FeaturedProducts from "../../components/user/FeaturedProducts";
import RecommendedProducts from "../../components/user/RecommendedProducts";
import Footer from "../../components/user/Footer";
import Newsletter from "../../components/user/Newsletter";
import WhatsAppIcon from "../../components/user/WhatapsIcons";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FlashDeals />
      <PromoSection />
      <TopSellers />
      <PopularCategories />
      <PersonalizedGifts />
      <TShirtCollection />
      <HoddiesCollection />
      <OffersBanner />
      <MugCollection />
      <FeaturedProducts />
      <RecommendedProducts />
      <Newsletter />
      <WhatsAppIcon/>
      <Footer />
    </>
  );
}
