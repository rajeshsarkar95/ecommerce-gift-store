import "../../styles/Navbar.css";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Dropdown from "./Dropdown";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useCart();
  const option = [
    "Home",
    "FlashDeals",
    "Topellers",
    "PopularCategories",
    "T-Shirt",
    "HoodiesCollection",
    "MugCollection",
  ];
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="UphaarBox Logo" />
      </div>
      <div
        className="hamburger"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
        <Link to="/cart" onClick={() => setMobileMenu(false)}>🛒</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button aria-label="Search">🔍</button>
        <Dropdown options={option} label="Select Category" />
      </div>
      <div className="icons">
        <Link to="/wishlist">❤️</Link>
        <Link to="/cart">🛒 <span>({cart?.length || 0})</span></Link>
        <Link to="/profile">👤</Link>
      </div>
      <div className={`mobile-menu ${mobileMenu ? "active" : ""}`}>
        <div className="close-menu" onClick={() => setMobileMenu(false)}>✖</div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button aria-label="Search">🔍</button>
          <Dropdown options={option} label="Select Category" />
        </div>
        <div className="menu-links">
          {option.map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}>
              {item}
            </Link>
          ))}
        </div>
        <div className="icons">
          <Link to="/wishlist" onClick={() => setMobileMenu(false)}>❤️ Wishlist</Link>
          <Link to="/cart" onClick={() => setMobileMenu(false)}>🛒 Cart ({cart?.length || 0})</Link>
          <Link to="/profile" onClick={() => setMobileMenu(false)}>👤 Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
