import React, { useEffect, useState } from "react";
import "../../styles/PopularCategories.css";
import axios from "axios";

function PopularCategoriesPage() {
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
      <section className="popular-categories-section">
        <h2 className="popular-categories-title">Popular Categories</h2>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="popular-categories-section">
      <h2 className="popular-categories-title">Popular Categories</h2>
      <div className="popular-categories-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="popular-category-card" key={category._id}>
              <img
                src={category.images?.[0]?.url || "/placeholder.jpg"}
                alt={category.title}
                className="popular-category-img"
              />
              <h4 className="popular-category-title">{category.title}</h4>
              <p className="popular-category-count">{category.itemsCount} items</p>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </section>
  );
}

export default PopularCategoriesPage;
