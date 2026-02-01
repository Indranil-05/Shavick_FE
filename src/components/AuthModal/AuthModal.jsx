import { useState, useEffect } from "react";
import "./AuthModal.css";

const AuthModal = ({ mode, setMode, closeModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Reset form when mode changes
  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
  }, [mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    if (mode === "signup" && !formData.name) {
      alert("Please enter your full name");
      return;
    }

    // 🔐 later: backend API call
    onSuccess();
  };

  return (
    <div className="auth-overlay" onClick={closeModal}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✕</button>

        <h2>{mode === "login" ? "Welcome Back" : "Join Shavick"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="auth-submit" type="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <span
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login" ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
