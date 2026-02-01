import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const Checkout = ({ isLoggedIn, openLogin }) => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // 🔐 Checkout guard
  useEffect(() => {
    if (!isLoggedIn) {
      openLogin();
      navigate("/cart");
    }
  }, [isLoggedIn]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.qty * parseInt(item.price.replace("₹", "")),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      orderId: "SHV" + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total,
      status: "Order Placed",
      address: form,
      createdAt: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([order, ...existingOrders])
    );

    clearCart();
    navigate("/track-order");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <h3>Shipping Details</h3>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
          />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />

          <button onClick={placeOrder}>Place Order</button>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>
                ₹{parseInt(item.price.replace("₹", "")) * item.qty}
              </span>
            </div>
          ))}

          <hr />
          <h4>Total: ₹{total}</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
