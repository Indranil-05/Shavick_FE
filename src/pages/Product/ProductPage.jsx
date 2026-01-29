import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { useCart } from "../../context/CartContext";

/* Dummy product data */
const products = [
  {
    id: "1",
    name: "French Tip Classic",
    price: "₹899",
    category: "French Tips",
    image:
      "https://i.pinimg.com/originals/fa/01/56/fa0156db39315d627cb0557d1de58b1d.jpg",
    rating: 4.6,
    boughtCount: 1248,
    description:
      "Elegant and timeless French tip nail extensions perfect for any occasion.",
  },
  {
    id: "2",
    name: "Soft Nude Elegance",
    price: "₹999",
    category: "Classic Nude",
    image:
      "https://www.colorcoatss.com/cdn/shop/files/IMG-9412.jpg?v=1700768097",
    rating: 4.3,
    boughtCount: 876,
    description:
      "Minimal and classy nude nail extensions with a premium matte finish.",
  },
  {
    id: "3",
    name: "Matte Finish Pro",
    price: "₹1099",
    category: "Matte Finish Nails",
    image:
      "https://www.byrdie.com/thmb/EihxuPQxkoeNeL-FGagnWcHr2B8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-10-20at1.11.02PM-19cb87a56adb494680066a081a3d4e2e.png",
    rating: 4.8,
    boughtCount: 1564,
    description:
      "Bold matte nail extensions designed for confident everyday wear.",
  },
];

/* ⭐ Stars */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

const ProductPage = ({ isLoggedIn, openLogin }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const numericProductId = Number(productId);
  const product = products.find((p) => Number(p.id) === numericProductId);
  const cartItem = cartItems.find((item) => item.id === numericProductId);

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
    addToCart(product);
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
              • {product.boughtCount.toLocaleString()} bought
            </span>
          </p>

          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>

          {/* CART CONTROLS */}
          {!cartItem ? (
            <button className="add-to-cart-btn" onClick={handleAdd}>
              Add to Cart
            </button>
          ) : (
            <div className="qty-controls">
              <span onClick={() => decreaseQty(numericProductId)}>
                {cartItem.qty === 1 ? "🗑️" : "➖"}
              </span>
              <span>{cartItem.qty}</span>
              <span onClick={() => increaseQty(numericProductId)}>➕</span>
            </div>
          )}

          {/* 🔥 SUGGESTED PRODUCTS */}
          <div className="suggested-section">
            <h3>You may also like</h3>

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
      </div>
    </div>
  );
};

export default ProductPage;
