import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TopBar.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [topBar, setTopBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/admin/dashboard");
  };
  useEffect(() => {
    const fetchTopBar = async () => {
      try {
        const response = await axios.get("https://onlinegiftbackend.onrender.com/api/topbar");
        setTopBar(response.data[0]);
      } catch (error) {
        console.error("Error fetching TopBar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBar();
  }, []);
  if (loading) return null;
  return (
    <div className="top-bar">
      <div className="top-icons">
        <div className="icon-item" title={topBar?.phone}>
          <FaPhoneAlt />
        </div>
        <div className="icon-item" title={topBar?.email}>
          <FaEnvelope />
        </div>
        <a
          href={topBar?.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-item"
        >
          <FaFacebookF />
        </a>
        <a
          href={topBar?.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-item"
        >
          <FaInstagram />
        </a>
        <button className="redirect-btn" onClick={handleRedirect}>
          admin
        </button>
      </div>
    </div>
  );
}

export default TopBar;
