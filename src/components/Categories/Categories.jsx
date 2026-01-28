import "./Categories.css";

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
  const handleCategoryClick = (category) => {
    alert(`You clicked on ${category}`);
    // later: navigate(`/category/${category}`)
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
