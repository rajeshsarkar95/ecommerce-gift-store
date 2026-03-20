import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const buttonStyle = {
    marginTop: "100px",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.25s ease-in-out",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  };


  const handleMouseEnter = (e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
    e.target.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    e.target.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
  };

  const handleMouseDown = (e) => {
    e.target.style.transform = "scale(0.96)";
  };

  const handleMouseUp = (e) => {
    e.target.style.transform = "translateY(-2px)";
  };

  return (
    <button
      onClick={handleLogout}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      Logout
    </button>
  );
};

export default LogoutButton;