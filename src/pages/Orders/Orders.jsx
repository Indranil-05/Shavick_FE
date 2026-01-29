import "./Orders.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

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
              <span><strong>Order ID:</strong> {order.orderId}</span>
              <span><strong>Total:</strong> ₹{order.total}</span>
            </div>

            <div className="order-row">
              <span>{order.items.length} item(s)</span>
              <span className="status">{order.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
