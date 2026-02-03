import { useNavigate } from "react-router-dom";
import { useQuery }  from "@apollo/client/react";

import "./Categories.css";
import { GET_CATEGORIES } from "../../graphql/queries";

const Categories = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Failed to load categories</p>;

  return (
    <section className="categories">
      <h2 className="categories-title">Shop By Style</h2>

      <div className="categories-grid">
        {data.categories.map((cat) => (
          <div
            key={cat._id}
            className="category-card"
            onClick={() => navigate(`/category/${cat.slug}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <div className="category-overlay">
              <h3>{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
