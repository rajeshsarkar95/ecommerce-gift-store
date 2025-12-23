import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OfferBanners.css";

export default function OffersBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("https://onlinegiftbackend.onrender.com/api/bulkOrderImage");
      const data = res?.data?.data || [];
      const formatted = data.map((item) => ({
        id: item._id,
        img: item.bulkOrderImage, 
        alt: "Offer Banner",
      }));
      setBanners(formatted);
    } catch (err) {
      console.error("Banner Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) return <p>Loading banners...</p>;
  if (!banners.length) return <p>No banners available.</p>;

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
