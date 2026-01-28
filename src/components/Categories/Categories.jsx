import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  "French Tips",
  "Classic Nude",
  "Matte Finish Nails",
  "Soft Pastel Nails",
  "Micro French",
  "Oval Shaped",
  "Classic Long",
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <section className="categories">
      <h2 className="categories-title">Shop By Style</h2>

      <div className="categories-grid">
        {categories.map((item, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
