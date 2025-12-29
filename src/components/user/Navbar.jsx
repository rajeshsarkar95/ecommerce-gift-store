import "../../styles/Navbar.css";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const { cart } = useCart();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Flash Deals", path: "/flashdealspage" },
    { label: "Top Sellers", path: "/topsellerpage" },
    { label: "T-Shirt", path: "/tshirtpage" },
    { label: "Hoodies Collection", path: "/hoodiesPage" },
    { label: "Mug Collection", path: "/mugspage" },
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
        <Link to="/cart" onClick={() => setMobileMenu(false)}><CiShoppingCart/></Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button aria-label="Search">🔍</button>
        <Dropdown options={menuItems} label="Select Category" />
      </div>
      <div className="icons">
        <Link to="/wishlist">❤️</Link>
        <Link to="/cart"><CiShoppingCart /><span>({cart?.length || 0})</span></Link>
        <Link to="/profile">👤</Link>
      </div>
      <div className={`mobile-menu ${mobileMenu ? "active" : ""}`}>
        <div className="close-menu" onClick={() => setMobileMenu(false)}>✖</div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button aria-label="Search">🔍</button>
          <Dropdown options={menuItems} label="Select Category" />
        </div>
        <div className="menu-links">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}

        </div>
        <div className="icons">
          <Link to="/wishlist" onClick={() => setMobileMenu(false)}>❤️ Wishlist</Link>
          <Link to="/cart" onClick={() => setMobileMenu(false)}><CiShoppingCart /> Cart ({cart?.length || 0})</Link>
          <Link to="/profile" onClick={() => setMobileMenu(false)}>👤 Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
