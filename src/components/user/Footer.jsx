import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-about">
          <h3>Gifty - Happy Gift Store</h3>
          <p>Making every gift uniquely yours. Personalized with love </p>
        </div>
        <div className="footer-links">
          <h4>Top Categories</h4>
          <ul>
            <li><a href="#">Calendars</a></li>
            <li><a href="#">Photo Frames</a></li>
            <li><a href="#">Printed Cushions</a></li>
            <li><a href="#">T-Shirts</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Help & Guide</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">How to Order</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Shipping Info</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><strong>uphaarbox Gift Store</strong></p>
          <p>14 St Road, Mumbai, 400001</p>
          <p>Email: info@giftyonline.com</p>
          <p>Phone: +91 98701 65432</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Gifty. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
