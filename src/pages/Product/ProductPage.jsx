import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";

import "./ProductPage.css";
import { useCart } from "../../context/CartContext";

import {
  GET_PRODUCT,
  GET_REVIEWS,
  PRODUCTS_BY_CATEGORY,
} from "../../graphql/queries";

/* ⭐ Helper */
const renderStars = (rating = 0) => {
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

  /* 🔥 PRODUCT QUERY */
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  if (productLoading)
    return <p style={{ padding: "50px" }}>Loading product...</p>;

  if (productError || !productData?.product)
    return <p style={{ padding: "50px" }}>Product not found</p>;

  const product = productData.product;

  const cartItem = cartItems.find(
    (item) => item.id === product._id
  );

  /* 🔥 REVIEWS QUERY */
  const { data: reviewData } = useQuery(GET_REVIEWS, {
    variables: { productId },
  });

  /* 🔥 SUGGESTED PRODUCTS (same category) */
  const { data: suggestedData } = useQuery(
    PRODUCTS_BY_CATEGORY,
    {
      variables: { slug: product.categorySlug },
    }
  );

  const suggestedProducts =
    suggestedData?.productsByCategory?.filter(
      (p) => p._id !== product._id
    ) || [];

  const handleAdd = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: `₹${product.price}`,
      image: product.images?.[0],
    });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* IMAGE */}
        <div className="product-image">
          <img
            src={product.images?.[0]}
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="product-details">
          <h1 className="product-title">
            {product.name}
            <span className="product-rating-inline">
              <span className="stars">
                {renderStars(product.ratingAvg)}
              </span>
              <span className="rating-text">
                {product.ratingAvg || "New"} / 5
              </span>
            </span>
          </h1>

          <p className="product-category">
            {product.categorySlug}
            <span className="bought-inline">
              •{" "}
              {(product.boughtCount || 0).toLocaleString()}{" "}
              people bought this
            </span>
          </p>

          <p className="product-price">
            ₹{product.price}
          </p>

          <p className="product-description">
            {product.description}
          </p>

          {/* 🛒 CART CONTROLS */}
          {!cartItem ? (
            <button
              className="add-to-cart-btn"
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          ) : (
            <div className="qty-controls">
              <span
                onClick={() =>
                  decreaseQty(product._id)
                }
              >
                {cartItem.qty === 1
                  ? "🗑️"
                  : "➖"}
              </span>

              <span>{cartItem.qty}</span>

              <span
                onClick={() =>
                  increaseQty(product._id)
                }
              >
                ➕
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ⭐ REVIEWS */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {reviewData?.reviews?.length > 0 ? (
          reviewData.reviews.map((r) => (
            <div key={r._id} className="review">
              <div className="stars">
                {renderStars(r.rating)}
              </div>
              <p>{r.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {/* 🔥 SUGGESTED PRODUCTS */}
      <div className="suggested-section">
        <h2>You may also like</h2>

        <div className="suggested-grid">
          {suggestedProducts.map((item) => (
            <div
              key={item._id}
              className="suggested-card"
              onClick={() =>
                navigate(`/product/${item._id}`)
              }
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
              />
              <p>{item.name}</p>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
