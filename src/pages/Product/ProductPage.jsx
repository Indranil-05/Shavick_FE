import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { useCart } from "../../context/CartContext";
import products from "../../data/products";

/* ⭐ Helper */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

const ProductPage = ({ isLoggedIn, openLogin }) => {
  const { productId } = useParams(); // 👈 STRING
  const navigate = useNavigate();

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  // ✅ STRING COMPARISON (FIX)
  const product = products.find((p) => p.id === productId);
  const cartItem = cartItems.find((item) => item.id === productId);

  if (!product) {
    return <p style={{ padding: "50px" }}>Product not found</p>;
  }

  const suggestedProducts = products.filter(
    (p) => p.id !== productId
  );

  const handleAdd = () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    addToCart(product); // product.id stays STRING
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* IMAGE */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* DETAILS */}
        <div className="product-details">
          <h1 className="product-title">
            {product.name}
            <span className="product-rating-inline">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-text">{product.rating} / 5</span>
            </span>
          </h1>

          <p className="product-category">
            {product.category}
            <span className="bought-inline">
              • {product.boughtCount.toLocaleString()} people bought this
            </span>
          </p>

          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>

          {/* 🛒 CART CONTROLS */}
          {!cartItem ? (
            <button className="add-to-cart-btn" onClick={handleAdd}>
              Add to Cart
            </button>
          ) : (
            <div className="qty-controls">
              <span onClick={() => decreaseQty(productId)}>
                {cartItem.qty === 1 ? "🗑️" : "➖"}
              </span>
              <span>{cartItem.qty}</span>
              <span onClick={() => increaseQty(productId)}>➕</span>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 SUGGESTED PRODUCTS */}
      <div className="suggested-section">
        <h2>You may also like</h2>

        <div className="suggested-grid">
          {suggestedProducts.map((item) => (
            <div
              key={item.id}
              className="suggested-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
