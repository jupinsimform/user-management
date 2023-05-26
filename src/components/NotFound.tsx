import { useLocation, useNavigate } from "react-router-dom";
import notFound from "../assets/404-page-not-found.png";

export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound">
      <img src={notFound} alt="page not found" />
      <h2 className="m-15">Page Not Found</h2>
      <h3>The path ({pathname}) does not exist</h3>
      <div className="m-15">
        <button onClick={goBack} className="goback">
          Go Back
        </button>
      </div>
    </div>
  );
}
