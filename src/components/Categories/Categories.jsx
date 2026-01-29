import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    name: "French Tips",
    slug: "french-tips",
    image:
      "https://celebritips.com/cdn/shop/files/0c0104596g6b1664a430b7c428ee23bf.jpg?v=1763036614",
  },
  {
    name: "Classic Nude",
    slug: "classic-nude",
    image:
      "https://www.colorcoatss.com/cdn/shop/files/IMG-9412.jpg?v=1700768097",
  },
  {
    name: "Matte Finish Nails",
    slug: "matte-finish-nails",
    image:
      "https://www.byrdie.com/thmb/EihxuPQxkoeNeL-FGagnWcHr2B8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-10-20at1.11.02PM-19cb87a56adb494680066a081a3d4e2e.png",
  },
  {
    name: "Soft Pastel Nails",
    slug: "soft-pastel-nails",
    image:
      "https://i.pinimg.com/736x/42/23/12/422312da3cb31f840e94fe9d552bf485.jpg",
  },
  {
    name: "Micro French",
    slug: "micro-french",
    image:
      "https://thepinkissue.com/wp-content/uploads/2025/03/Light-blue-micro-french-manicure.jpg.webp",
  },
  {
    name: "Oval Shaped",
    slug: "oval-shaped",
    image:
      "https://cdn.shopify.com/s/files/1/0890/9055/6188/files/round-press-on-nails_600x600.jpg?v=1727424737",
  },
  {
    name: "Classic Long",
    slug: "classic-long",
    image:
      "https://i.pinimg.com/736x/77/da/7e/77da7e7b74cc41dfd368eefac4ca2391.jpg",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <h2 className="categories-title">Shop By Style</h2>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
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
