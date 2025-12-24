/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../styles/Hero.css";
import axios from "axios";
const defaultHero = {
  title: "Welcome to Online Gift Store",
  subtitle: "Best Gifts Online",
  descriptions: "Find amazing gifts for your loved ones",
  backgroundImage: "/default-hero.webp", 
};
const Hero = () => {
  const [heroData, setHeroData] = useState(defaultHero);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/customebanner"
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          const imageUrl = data.backgroundImage || defaultHero.backgroundImage;
          setHeroData({
            title: data.title || defaultHero.title,
            subtitle: data.subtitle || defaultHero.subtitle,
            descriptions: data.descriptions || defaultHero.descriptions,
            backgroundImage: imageUrl,
          });
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
  if (!heroData) return <p>Loading hero data...</p>;
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>{heroData.title}</h1>
        <h2>{heroData.subtitle}</h2>
        <p>{heroData.descriptions}</p>
        <button>Shop Now</button>
      </div>
      {heroData.backgroundImage && (
        <img
          src={heroData.backgroundImage}   
          alt="Gift Banner"               
          loading="eager"                 
          fetchpriority="high"           
          width="1200"
          height="600"
        />
      )}
    </section>
  );
};

export default Hero;
