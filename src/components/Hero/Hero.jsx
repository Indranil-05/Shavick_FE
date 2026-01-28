import "./Hero.css";
import logo from "../../assets/logo.png";

const Hero = ({ openSignup }) => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <img src={logo} alt="Shavick Logo" className="hero-logo-img" />

        <p className="hero-tagline">Premium Nail Extensions</p>

        <p className="hero-text">
          Confidence, elegance, and beauty — crafted just for you.
        </p>

        <button className="join-btn" onClick={openSignup}>
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
