import React from "react";
import "../../styles/PromoBanners.css";
import proimg1 from "../../assets/b1.jpg";

function PromoSection() {
  return (
    <section className="promo-section">
      <div className="promo-container">
        {/* Promo Banner 1 */}
        <div className="promo-banner">
          <img src={proimg1} alt="Custom T-Shirt Sale" />
          <div className="promo-text">
            <h3>Custom T-Shirt</h3>
            <h1>BIG SALE</h1>
            <p>Exclusive 50% Off on Printed T-Shirts</p>
          </div>
        </div>
        {/* Promo Banner 2 */}
        <div className="promo-banner">
          <img src={proimg1} alt="New Launch Sale" />
          <div className="promo-text">
            <h3>New Launch</h3>
            <h1>SALE LIVE</h1>
            <p>Best Brother Ever Edition</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PromoSection;
