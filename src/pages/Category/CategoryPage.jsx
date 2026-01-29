import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";
import { useCart } from "../../context/CartContext";

const products = [
  {
    id: 1,
    category: "french-tips",
    name: "French Tip Classic",
    price: "₹899",
    image: "https://i.pinimg.com/originals/fa/01/56/fa0156db39315d627cb0557d1de58b1d.jpg",
    rating: 4.6,
    boughtCount: 1248,
  },
  {
    id: 2,
    category: "classic-nude",
    name: "Soft Nude Elegance",
    price: "₹999",
    image: "https://www.colorcoatss.com/cdn/shop/files/IMG-9412.jpg?v=1700768097",
    rating: 4.3,
    boughtCount: 876,
  },
  {
    id: 3,
    category: "matte-finish-nails",
    name: "Matte Finish Pro",
    price: "₹1099",
    image: "https://www.byrdie.com/thmb/EihxuPQxkoeNeL-FGagnWcHr2B8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-10-20at1.11.02PM-19cb87a56adb494680066a081a3d4e2e.png",
    rating: 4.8,
    boughtCount: 1564,
  },
  {
    id: 4,
    category: "french-tips",
    name: "Elegant French Tips",
    price: "₹799",
    image: "https://celebritips.com/cdn/shop/files/0c0104596g6b1664a430b7c428ee23bf.jpg?v=1763036614",
    rating: 4.5,
    boughtCount: 980,
  },
  {
    id: 5,
    category: "soft-pastel-nails",
    name: "Pastel Dream Nails",
    price: "₹999",
    image: "https://i.pinimg.com/736x/42/23/12/422312da3cb31f840e94fe9d552bf485.jpg",
    rating: 4.4,
    boughtCount: 765
  },
  {
    id: 6,
    category: "micro-french",
    name: "Micro French Chic",
    price: "₹899",
    image: "https://thepinkissue.com/wp-content/uploads/2025/03/Light-blue-micro-french-manicure.jpg.webp",
    rating: 4.7,
    boughtCount: 432
  },
  {
    id: 7,
    category: "oval-shaped",
    name: "Oval Shaped Glam",
    price: "₹1099",
    image: "https://cdn.shopify.com/s/files/1/0890/9055/6188/files/round-press-on-nails_600x600.jpg?v=1727424737",
    rating: 4.2,
    boughtCount: 654
  },
  {
    id: 8,
    category: "classic-long",
    name: "Classic Long Nails",
    price: "₹1199",
    image: "https://i.pinimg.com/736x/77/da/7e/77da7e7b74cc41dfd368eefac4ca2391.jpg",
    rating: 4.5,
    boughtCount: 789
  },
];

/* ⭐ Helper */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
};

const formatCategoryName = (name) =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const CategoryPage = ({ isLoggedIn, openLogin }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const filteredProducts = products.filter(
    (item) => item.category === categoryName
  );

  const handleAddToCart = (e, item) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      openLogin();
      return;
    }

    addToCart(item);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{formatCategoryName(categoryName)}</h1>
        <p>Explore our exclusive nail extensions</p>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const cartItem = cartItems.find(
              (c) => c.id === item.id
            );

            return (
              <div
                className="product-card"
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>

                {/* ⭐ RATING */}
                <div className="product-rating">
                  <span className="stars">
                    {renderStars(item.rating)}
                  </span>
                  <span className="rating-text">
                    {item.rating}
                  </span>
                </div>

                {/* 🧍 BOUGHT COUNT */}
                <p className="bought-count">
                  {item.boughtCount.toLocaleString()} bought
                </p>

                {/* 🛒 CART CONTROLS */}
                {!cartItem ? (
                  <button
                    onClick={(e) =>
                      handleAddToCart(e, item)
                    }
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-controls">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQty(item.id);
                      }}
                    >
                      {cartItem.qty === 1 ? "🗑️" : "➖"}
                    </span>

                    <span>{cartItem.qty}</span>

                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQty(item.id);
                      }}
                    >
                      ➕
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
