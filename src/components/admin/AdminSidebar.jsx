import React from 'react';
import LogoutButton from '../comon/LogoutButton';


const AdminSidebar = ({onTabChange})=>{

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    height: '100vh',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
  };
  
  const itemStyle = {
    padding: '10px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #34495e'
  };
  
  return (
    <>
      <div style={sidebarStyle}>
        <h3>🔑 Admin Panel</h3>
        <nav>
          <div style={itemStyle} onClick={() => onTabChange("Topbar")}>Topbar</div>
          <div style={itemStyle} onClick={() => onTabChange("CustomizedGift")}>Customized Gift</div>
          <div style={itemStyle} onClick={() => onTabChange("Flashdeals")}>Flash Deals</div>
          <div style={itemStyle} onClick={() => onTabChange("Banner")}>Banner</div>
          <div style={itemStyle} onClick={() => onTabChange("PopularCategories")}>Popular Categories</div>
          <div style={itemStyle} onClick={() => onTabChange("PersonalGift")}>Personal Gift</div>
          <div style={itemStyle} onClick={() => onTabChange("Tshirt")}>Tshirt</div>
          <div style={itemStyle} onClick={() => onTabChange("TopSeller")}>Topseller</div>
          <div style={itemStyle} onClick={() => onTabChange("MugCollection")}>Mug Colletion</div>
          <div style={itemStyle} onClick={() => onTabChange("HoodiesCollection")}>Hoodies Collection</div>
          <div style={itemStyle} onClick={() => onTabChange("FeaturedProducts")}>Featured Products</div>
          <div style={itemStyle} onClick={() => onTabChange("RecommendedProducts")}>Recommended Products</div>
        </nav>
        <LogoutButton/>
      </div>
    </>
  );
};

export default AdminSidebar;
