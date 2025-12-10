/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OfferBanners.css";

export default function OffersBanner() {
  const [banners, setBanners] = useState([]);
  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customegiftbanner");
      const data = res?.data?.data || [];
      const formatted = data.map((item) => ({
        id: item._id,
        img: `http://localhost:5000/${item.bulkOrderImage}`, 
        alt: "Offer Banner",
      }));
      setBanners(formatted);
    } catch (err) {
      console.error("Banner Fetch Error:", err);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);
  return (
    <section className="offer-banners">
      {banners.map((offer) => (
        <div className="offer" key={offer.id}>
          <img src={offer.img} alt={offer.alt} />
          <div className="offer-text"></div>
        </div>
      ))}
    </section>
  );
}
