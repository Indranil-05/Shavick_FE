import "./TrackOrder.css";

const TrackOrder = () => {
  const order =
  JSON.parse(localStorage.getItem("currentOrder")) ||
  JSON.parse(localStorage.getItem("orders"))?.[0];


  if (!order) {
    return <h2 style={{ padding: "60px" }}>No order found</h2>;
  }

  return (
    <div className="track-page">
      <h2>Track Your Order</h2>

      <div className="order-card">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.total}</p>

        <h4>Delivery Address</h4>
        <p>
          {order.address.name}, {order.address.address},{" "}
          {order.address.city} - {order.address.pincode}
        </p>

        <div className="status-bar">
          <div className="active">Placed</div>
          <div>Shipped</div>
          <div>Delivered</div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
