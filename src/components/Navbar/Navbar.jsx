import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Shavick Logo" className="navbar-logo-img" />
      </div>

      <ul className="navbar-links">
        <li>Home</li>
        <li>Categories</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="navbar-right">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search nail styles..."
        />
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
