import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import AuthModal from "./components/AuthModal/AuthModal";
import Checkout from "./pages/Checkout/Checkout";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";


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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
        

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
