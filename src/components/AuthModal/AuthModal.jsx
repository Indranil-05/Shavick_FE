import "./AuthModal.css";

const AuthModal = ({ mode, setMode, closeModal, onSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // later: real backend auth
    onSuccess();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={closeModal}>✕</button>

        <h2>{mode === "login" ? "Welcome Back" : "Join Shavick"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input type="text" placeholder="Full Name" />
          )}

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="auth-submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <span onClick={() =>
            setMode(mode === "login" ? "signup" : "login")
          }>
            {mode === "login" ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
