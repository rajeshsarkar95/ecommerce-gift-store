import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OfferBanners.css";

const VISIT_COOKIE = "site_visited";
const VISIT_COOKIE_DAYS = 365;

function getCookie(name){
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}
function setCookie(name, value, days){
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
export default function OffersBanner(){
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );
  useEffect(() =>{
    const visited = getCookie(VISIT_COOKIE);
    if (!visited){
      setIsFirstVisit(true);
      setCookie(VISIT_COOKIE, "true", VISIT_COOKIE_DAYS);
    } else {
      setIsFirstVisit(false);
    }
  },[]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/bulkOrderImage"
        );
        setBanners(res?.data?.data || []);
      } catch (err) {
        console.error("Banner Fetch Error:", err);
      }
    };
    fetchBanners();
  }, []);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return <p>No banners available</p>;
  const first = banners[currentIndex];
  const second = banners[(currentIndex + 1) % banners.length];
  const visibleSlides = isMobile ? [first] : [first, second];
  return (
    <section className="offer-banners">
      <div className={`visitor-badge ${isFirstVisit ? "first-visit" : "returning-visit"}`}>
        {isFirstVisit ? "🎉 Welcome! Check out our offers" : "👋 Welcome back!"}
      </div>
      <div className="slider">
        {visibleSlides.map((banner, i)=>(
          <div className="slide" key={banner._id || i}>
            <img src={banner.bulkOrderImage} alt="Offer Banner" />
          </div>
        ))}
      </div>
    </section>
  );
}