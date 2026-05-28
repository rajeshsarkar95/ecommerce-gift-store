import React, { useEffect, useState } from "react";
import "../../styles/PromoBanners.css";
import axios from "axios";

function PromoSection() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () =>{
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/Promobanners");
        if (res.data.success){
          setBanners(res.data.data);
        }
      } catch (error){
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  },[]);
  return (
    <section className="promo-section">
      <div className="promo-container">
        {banners.map((banner)=>(
          <div className="promo-banner" key={banner._id}>
            <img
              src={banner.images?.[0]?.url || "/placeholder.jpg"} 
              alt={banner.title}
            />
            <div className="promo-text">
              <h3>{banner.subtitle}</h3>
              <h1>{banner.title}</h1>
              <p>{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default PromoSection;
