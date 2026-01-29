import { useState, useRef, useEffect } from "react";
import { FiShoppingBag, FiUser, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../../context/CartContext";
import SearchModal from "../SearchModal/SearchModal";

const Navbar = ({ isLoggedIn, openLogin, openSignup, onLogout }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const categoriesRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const categories = [
    "French Tips",
    "Classic Nude",
    "Matte Finish Nails",
    "Soft Pastel Nails",
    "Micro French",
    "Oval Shaped",
    "Classic Long",
  ];

  /* 🔥 Close dropdowns on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(e.target)
      ) {
        setShowCategories(false);
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(e.target)
      ) {
        setShowAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <ul className="navbar-links">
          <li onClick={() => navigate("/")}>Home</li>

          <li
            className="categories-link"
            onClick={() => {
              setShowCategories(!showCategories);
              setShowAccount(false);
            }}
          >
            Categories <span className="arrow">▼</span>
          </li>

          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* CENTER */}
        <div className="navbar-brand" onClick={() => navigate("/")}>
          SHAVICK
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {/* SEARCH ICON */}
          <FiSearch
            className="search-trigger"
            onClick={() => setShowSearch(true)}
          />

          {!isLoggedIn ? (
            <>
              <button className="login-btn" onClick={openLogin}>
                Login
              </button>
              <button className="signup-btn" onClick={openSignup}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              {/* CART */}
              <div
                className="cart-icon"
                onClick={() => navigate("/cart")}
              >
                <FiShoppingBag />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </div>

              {/* ACCOUNT */}
              <div
                className="account-box"
                ref={accountRef}
                onClick={() => {
                  setShowAccount(!showAccount);
                  setShowCategories(false);
                }}
              >
                <FiUser />
                {showAccount && (
                  <div className="account-dropdown">
                    <p
                      onClick={() => {
                        navigate("/orders");
                        setShowAccount(false);
                      }}
                    >
                      My Orders
                    </p>

                    <p
                      onClick={() => {
                        navigate("/track-order");
                        setShowAccount(false);
                      }}
                    >
                      Track Order
                    </p>

                    <p
                      onClick={() => {
                        onLogout();
                        setShowAccount(false);
                      }}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* CATEGORIES DROPDOWN */}
      {showCategories && (
        <div className="categories-dropdown" ref={categoriesRef}>
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-item"
              onClick={() => {
                navigate(
                  `/category/${cat.toLowerCase().replace(/\s+/g, "-")}`
                );
                setShowCategories(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}

      {/* SEARCH MODAL */}
      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} />
      )}
    </>
  );
};

export default Navbar;
