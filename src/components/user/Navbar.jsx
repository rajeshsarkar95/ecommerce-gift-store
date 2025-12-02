import "../../styles/Navbar.css";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="UphaarBox Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
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
