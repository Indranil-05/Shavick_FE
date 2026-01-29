import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Sorry, the page you are looking for does not exist or has been removed.
      </p>

      <button onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
