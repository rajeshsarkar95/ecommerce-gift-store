import React, { useEffect, useState } from "react";
import "../../styles/PopularCategories.css";
import axios from "axios";

function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/popularcategories");
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
          categories.map((cat) => (
            <div className="category" key={cat._id}>
              <img
                src={`http://localhost:5000/uploads/popularcategory/${cat.image[0]}`}
                alt={cat.title}
                className="category-img"
              />
              <h4>{cat.title}</h4>
              <p>{cat.itemsCount} items</p>
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
