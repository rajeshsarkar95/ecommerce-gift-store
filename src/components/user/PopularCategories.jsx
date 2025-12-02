import React from "react";
import "../../styles/PopularCategories.css";

// Importing Images
import cusion from "../../assets/cusion.jpg";
import mug from "../../assets/Mug.jpg";
import lamp from "../../assets/frame.png";
import tshirt from "../../assets/tshirt.jpg";
import frame from "../../assets/Fl.jpg";

function PopularCategories() {
  return (
    <section className="popular-categories">
      <h2>Popular Categories</h2>
      <div className="category-list">
        <div className="category">
          <img src={cusion} alt="Printed Cushion" />
          <h4>Printed Cushion</h4>
          <p>6 items</p>
        </div>
        <div className="category">
          <img src={mug} alt="Mugs" />
          <h4>Mugs</h4>
          <p>6 items</p>
        </div>
        <div className="category">
          <img src={lamp} alt="Lamp" />
          <h4>Lamp</h4>
          <p>5 items</p>
        </div>
        <div className="category">
          <img src={tshirt} alt="T-shirts" />
          <h4>T-shirts</h4>
          <p>6 items</p>
        </div>
        <div className="category">
          <img src={frame} alt="Photo Frames" />
          <h4>Photo Frames</h4>
          <p>9 items</p>
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
