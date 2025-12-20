import React, { useEffect, useState } from "react";
import "../../styles/PopularCategories.css";
import axios from "axios";

function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/popularcategories");
        if (res.data.success) {
          setCategories(res.data.data.slice(0, 5));
        }
      } catch (err) {
        console.log("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="popular-categories">
        <h2>Popular Categories</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="popular-categories">
      <h2>Popular Categories</h2>
      <div className="category-list">
        {categories.length > 0 ? (
          categories.map((product) => (
            <div className="category" key={product._id}>
              <img
                src={`https://onlinegiftbackend.onrender.com/uploads/popularcategory/${product.image}`}
                alt={product.title}
                className="category-img"
              />
              <h4>{product.title}</h4>
              <p>{product.itemsCount} items</p>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </section>
  );
}

export default PopularCategories;
