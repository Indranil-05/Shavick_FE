import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import "./AuthModal.css";

import {
  LOGIN_USER,
  SIGNUP_USER,
} from "../../graphql/mutations";

const AuthModal = ({ mode, setMode, closeModal, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginUser, { loading: loginLoading }] =
    useMutation(LOGIN_USER);

  const [signupUser, { loading: signupLoading }] =
    useMutation(SIGNUP_USER);

  // Reset form when mode changes
  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
  }, [mode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    if (mode === "signup" && !formData.name) {
      alert("Please enter your full name");
      return;
    }

    try {
      const mutation =
        mode === "login" ? loginUser : signupUser;

      const variables =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const res = await mutation({ variables });

      const data =
        mode === "login"
          ? res.data.loginUser
          : res.data.signupUser;

      // 🔐 Save token
      localStorage.setItem("token", data.token);

      onSuccess(); // sets isLoggedIn = true
    } catch (err) {
      alert(err.message || "Authentication failed");
    }
  };

  const loading = loginLoading || signupLoading;

  return (
    <div className="auth-overlay" onClick={closeModal}>
      <div
        className="auth-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✕
        </button>

        <h2>
          {mode === "login"
            ? "Welcome Back"
            : "Join Shavick"}
        </h2>

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

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <span
            onClick={() =>
              setMode(
                mode === "login"
                  ? "signup"
                  : "login"
              )
            }
          >
            {mode === "login"
              ? " Sign up"
              : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
