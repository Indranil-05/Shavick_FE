import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";

import "./CategoryPage.css";
import { useCart } from "../../context/CartContext";
import { PRODUCTS_BY_CATEGORY } from "../../graphql/queries";

/* ⭐ Helper */
const renderStars = (rating = 0) => {
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

  /* 🔥 GRAPHQL FETCH */
  const { data, loading, error } = useQuery(
    PRODUCTS_BY_CATEGORY,
    {
      variables: { slug: categoryName },
    }
  );

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading products...</p>;
  }

  if (error) {
    return <p style={{ padding: "40px" }}>Failed to load products</p>;
  }

  const products = data.productsByCategory;

  const handleAddToCart = (e, item) => {
    e.stopPropagation();

    addToCart({
      id: item._id,                 // 🔑 important
      name: item.name,
      price: `₹${item.price}`,      // keep CartContext happy
      image: item.images?.[0],
    });
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{formatCategoryName(categoryName)}</h1>
        <p>Explore our exclusive nail extensions</p>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((item) => {
            const cartItem = cartItems.find(
              (c) => c.id === item._id
            );

            return (
              <div
                className="product-card"
                key={item._id}
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                />

                <h3>{item.name}</h3>

                <p className="price">
                  ₹{item.price}
                </p>

                {/* ⭐ RATING */}
                <div className="product-rating">
                  <span className="stars">
                    {renderStars(item.ratingAvg)}
                  </span>
                  <span className="rating-text">
                    {item.ratingAvg || "New"}
                  </span>
                </div>

                {/* 🧍 BOUGHT COUNT */}
                <p className="bought-count">
                  {(item.boughtCount || 0).toLocaleString()}{" "}
                  bought
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
                        decreaseQty(item._id);
                      }}
                    >
                      {cartItem.qty === 1
                        ? "🗑️"
                        : "➖"}
                    </span>

                    <span>{cartItem.qty}</span>

                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQty(item._id);
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
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
            }}
          >
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
