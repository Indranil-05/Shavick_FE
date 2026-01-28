import { useParams } from "react-router-dom";
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
    reviews: [
      {
        user: "Ananya",
        rating: 5,
        comment: "Absolutely loved these nails! Super classy and long-lasting.",
      },
      {
        user: "Riya",
        rating: 4,
        comment: "Great quality, looks elegant. Worth the price.",
      },
    ],
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
    reviews: [
      {
        user: "Pooja",
        rating: 4,
        comment: "Very natural look. Loved the finish.",
      },
    ],
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
    reviews: [
      {
        user: "Sneha",
        rating: 5,
        comment: "Matte finish is amazing! Got so many compliments.",
      },
    ],
    description:
      "Bold matte nail extensions designed for confident everyday wear.",
  },
];

/* ⭐ Helper */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

const ProductPage = ({ isLoggedIn, openLogin }) => {
  const { productId } = useParams();

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const product = products.find((p) => p.id === productId);
  const numericProductId = Number(productId);

  const cartItem = cartItems.find(
    (item) => item.id === numericProductId
  );


  if (!product) {
    return <p style={{ padding: "50px" }}>Product not found</p>;
  }

  const handleAdd = () => {
    if (!isLoggedIn) {
      openLogin(); // 🔐 force login
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
          {/* NAME + RATING */}
          <h1 className="product-title">
            {product.name}
            <span className="product-rating-inline">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-text">{product.rating} / 5</span>
            </span>
          </h1>

          {/* CATEGORY + BOUGHT COUNT */}
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
              <span onClick={() => decreaseQty(numericProductId)}>
                {cartItem.qty === 1 ? "🗑️" : "➖"}
              </span>

              <span>{cartItem.qty}</span>

             <span onClick={() => increaseQty(numericProductId)}>➕</span>
            </div>
          )}
        </div>
      </div>

      {/* 💬 REVIEWS */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {product.reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <strong>{review.user}</strong>
              <span className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
