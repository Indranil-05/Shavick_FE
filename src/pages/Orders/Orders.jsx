import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Orders = ({ isLoggedIn, openLogin }) => {
  const navigate = useNavigate();

  // 🔐 Protect page
  useEffect(() => {
    if (!isLoggedIn) {
      openLogin();
      navigate("/");
    }
  }, [isLoggedIn]);

  // safe read
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    orders = [];
  }

  // newest first
  orders.sort(
    (a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="order-card"
            onClick={() => {
              localStorage.setItem(
                "currentOrder",
                JSON.stringify(order)
              );
              navigate("/track-order");
            }}
          >
            <div className="order-row">
              <span>
                <strong>Order ID:</strong> {order.orderId}
              </span>
              <span>
                <strong>Total:</strong> ₹{order.total}
              </span>
            </div>

            <div className="order-row">
              <span>{order.items.length} item(s)</span>
              <span className="status">{order.status}</span>
            </div>

            {order.createdAt && (
              <div className="order-date">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
