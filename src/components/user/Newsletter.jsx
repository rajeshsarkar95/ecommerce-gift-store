import React from "react";
import "../../styles/Newsletter.css";

const newsletterData = {
  title: "Follow Us on Instagram",
  description: "Stay updated with our latest posts and offers!",
};

function Newsletter() {
  const handleClick = () => {
    window.open("https://www.instagram.com/uphaarbox_by_kumarbrothers?igsh=MWF0dDFtcnRnb28ydQ%3D%3D&utm_source=qr", "_blank");
  };

  return (
    <section className="newsletter">
      <h2>{newsletterData.title}</h2>
      <p>{newsletterData.description}</p>

      <button onClick={handleClick}>
        Follow on Instagram
      </button>
    </section>
  );
}

export default Newsletter;