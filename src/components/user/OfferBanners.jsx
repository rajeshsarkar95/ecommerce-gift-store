import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OfferBanners.css";

export default function OffersBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return <p>No banners available</p>;

  const first = banners[currentIndex];
  const second = banners[(currentIndex + 1) % banners.length];

  return (
    <section className="offer-banners">
      <div className="slider">
        {[first, second].map((banner, i) => (
          <div className="slide" key={banner._id || i}>
            <img src={banner.bulkOrderImage} alt="Offer Banner" />
          </div>
        ))}
      </div>
    </section>
  );
}
