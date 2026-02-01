import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";

import AuthModal from "./components/AuthModal/AuthModal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔐 Open Login
  const openLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  // 🔐 Open Signup
  const openSignup = () => {
    setAuthMode("signup");
    setShowModal(true);
  };

  // ✅ Auth success
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        openLogin={openLogin}
        openSignup={openSignup}
        onLogout={handleLogout}
      />

      {/* ROUTES */}
      <Routes>
        {/* ✅ CHANGE IS HERE */}
        <Route
          path="/"
          element={<Home openSignup={openSignup} openLogin={openLogin} />}
        />

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

        {/* 🛒 Cart */}
        <Route
          path="/cart"
          element={
            <CartPage
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        {/* 🔐 Protected */}
        <Route
          path="/checkout"
          element={
            <Checkout
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        <Route
          path="/track-order"
          element={
            <TrackOrder
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <Orders
              isLoggedIn={isLoggedIn}
              openLogin={openLogin}
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
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
