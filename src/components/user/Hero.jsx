import "../../styles/Hero.css";
import heroImg from "../../assets/b.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Customized Gift Together Forever</h1>
        <p>Best Customized Gift for Couples with Multiple Photos & Cutouts.</p>
        <button>Shop Now</button>
      </div>
      <img src={heroImg} alt="Gift" />
    </section>
  );
};

export default Hero;
