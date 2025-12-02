import React from "react";
import "../../styles/Newsletter.css";

const newsletterData = {
  title: "Subscribe Newsletter",
  description: "Don't miss out on thousands of great deals & promotions!",
  placeholder: "Enter your email here..."
};
function Newsletter() {
  return (
    <section className="newsletter">
      <h2>{newsletterData.title}</h2>
      <p>{newsletterData.description}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder={newsletterData.placeholder}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}

export default Newsletter;
