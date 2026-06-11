import {useEffect,useState} from "react";
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
import DiscountBanner from "../../components/user/DiscountBanner";

export default function LandingPage(){
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
    setIsMobile(window.innerWidth < 768);
  },[]);

  return (
    <>
      {!isMobile && <Hero/>}
      <FlashDeals/>
      <PromoSection/>
      <DiscountBanner/>
      <TopSellers/>
      <PopularCategories/>
      <PersonalizedGifts/>
      <TShirtCollection/>
      <OffersBanner/>
      <HoddiesCollection/>
      <MugCollection/>
      <FeaturedProducts/>
      <RecommendedProducts/>
      <Newsletter/>
      <WhatsAppIcon/>
      <Footer/>
    </>
  );
}
