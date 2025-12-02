import React from "react";
import "../../styles/OfferBanners.css"; 
import bulk1 from "../../assets/bulk1.jpeg"
import bulk2 from  "../../assets/bulk2.jpeg"

const offerBanners = [
  {
    id: 1,
    img: bulk1,
    alt: "Best Offer Banner",
  },
  {
    id: 2,
    img: bulk2 ,
    alt: "Bulk Order Offer Banner",
  },
];

export default function OffersBanner() {
  return (
    <section className="offer-banners">
      {offerBanners.map((offer) => (
        <div className="offer" key={offer.id}>
          <img src={offer.img} alt={offer.alt} />
          <div className="offer-text"></div>
        </div>
      ))}
    </section>
  );
}
