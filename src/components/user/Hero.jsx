import React, { useEffect, useState } from "react";
import "../../styles/Hero.css";
import axios from "axios";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/customebanner"
        );
        if (response.data.length > 0) {
          setHeroData(response.data[0]);
        }
        console.log("Hero Data:", response.data);
      } catch (error) {
        console.error("Error fetching hero data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (!heroData) return <p>No hero data found</p>;

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>{heroData.title}</h1>
        <h1>{heroData.subtitle}</h1>
        <p>{heroData.descriptions}</p>
        <button>Shop Now</button>
      </div>
      {heroData.backgroundImage && (
        <img
          src={`https://onlinegiftbackend.onrender.com/uploads/customeBanner/${heroData.backgroundImage}`}
          alt="Gift"
        />
      )}
    </section>
  );
};

export default Hero;
