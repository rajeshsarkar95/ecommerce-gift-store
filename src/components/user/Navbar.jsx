import "../../styles/Navbar.css";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { cart } = useCart();
  const option = ["Home", "FlashDeals","Topellers","PopularCategories","T-Shirt","HoodiesCollection","MugCollection"];
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="UphaarBox Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
        <Dropdown options={option} label="Choose a fruit" />
      </div>
      <div className="icons">
        <Link to="/wishlist">❤️</Link>
        <Link to="/cart">
          🛒 <span>({cart.length})</span>
        </Link>
        <Link to="/profile">👤</Link>
      </div>
    </div>
  );
};

export default Navbar;
