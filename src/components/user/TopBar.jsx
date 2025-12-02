import React from 'react';
import "../../styles/TopBar.css";

function TopBar() {
  return (
    <div className="top-bar">
      <div>📞 +91 9992103452 | ✉️ info@giftyonline.com</div>
      <div>
        Follow us: 
        <a href="#" style={{color:"#fff"}}>Facebook</a> |
        <a href="#" style={{color:"#fff"}}>Instagram</a>
      </div>
    </div>
  );
}

export default TopBar;
