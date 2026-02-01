import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = ({ isLoggedIn, openLogin }) => {
  const { cartItems, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.qty * parseInt(item.price.replace("₹", "")),
    0
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      openLogin();   // 🔐 force login
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Your Cart</h1>

        {cartItems.length > 0 && (
          <button
            className="checkout-btn"
            onClick={() => {
              if (!isLoggedIn) {
                openLogin();
                return;
              }
              navigate("/checkout");
            }}

          >
            Proceed to Checkout →
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p className="cart-price">
                  ₹{parseInt(item.price.replace("₹", "")) * item.qty}
                </p>

                <div className="qty-controls">
                  <span onClick={() => decreaseQty(item.id)}>
                    {item.qty === 1 ? "🗑️" : "➖"}
                  </span>

                  <span>{item.qty}</span>

                  <span onClick={() => increaseQty(item.id)}>
                    ➕
                  </span>
                </div>
              </div>
            </div>
          ))}

          <h2 className="cart-total">
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
