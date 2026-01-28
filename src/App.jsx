import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import AuthModal from "./components/AuthModal/AuthModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* 🔒 GLOBAL NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        openLogin={openLogin}
        openSignup={openSignup}
        onLogout={handleLogout}
      />

      {/* ✅ ROUTES MUST BE INSIDE <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/category/:categoryName"
          element={
            <CategoryPage
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductPage
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        <Route path="/cart" element={<CartPage />} />
      </Routes>

      {/* 🔒 GLOBAL FOOTER */}
      <Footer />

      {/* 🔐 AUTH MODAL */}
      {showModal && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          closeModal={() => setShowModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default App;
