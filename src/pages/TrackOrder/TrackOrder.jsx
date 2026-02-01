import "./TrackOrder.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Order Placed", "Shipped", "Delivered"];

const TrackOrder = ({ isLoggedIn, openLogin }) => {
  const navigate = useNavigate();

  // 🔐 protect page
  useEffect(() => {
    if (!isLoggedIn) {
      openLogin();
      navigate("/");
    }
  }, [isLoggedIn]);

  // ✅ safe read
  let order = null;
  try {
    order =
      JSON.parse(localStorage.getItem("currentOrder")) ||
      JSON.parse(localStorage.getItem("orders"))?.[0];
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <h2 style={{ padding: "60px" }}>
        No order found
      </h2>
    );
  }

  const activeIndex = steps.indexOf(order.status);

  return (
    <div className="track-page">
      <h2>Track Your Order</h2>

      <div className="order-card">
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>

        {order.createdAt && (
          <p>
            <strong>Placed On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        )}

        <h4>Delivery Address</h4>
        <p>
          {order.address.name},{" "}
          {order.address.address},{" "}
          {order.address.city} -{" "}
          {order.address.pincode}
        </p>

        {/* ✅ dynamic status bar */}
        <div className="status-bar">
          {steps.map((step, i) => (
            <div
              key={step}
              className={
                i <= activeIndex ? "active" : ""
              }
            >
              {step.replace("Order ", "")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
