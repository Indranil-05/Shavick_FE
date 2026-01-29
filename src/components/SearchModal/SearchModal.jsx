import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./SearchModal.css";
import products from "../../data/products";

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-overlay">
      <div className="search-modal">
        {/* HEADER */}
        <div className="search-header">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search nail styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <FiX className="close-icon" onClick={onClose} />
        </div>

        {/* RESULTS */}
        <div className="search-results">
          {query && filteredProducts.length === 0 && (
            <p className="no-results">No products found</p>
          )}

          <div className="results-grid">
            {filteredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="result-card"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  onClose();
                }}
              >
                <img src={product.image} alt={product.name} />
                <p className="name">{product.name}</p>
                <p className="price">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      <div className="backdrop" onClick={onClose}></div>
    </div>
  );
};

export default SearchModal;
