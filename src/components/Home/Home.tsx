import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/feature/userSlice";
import dashboard from "../../assets/dashboard.png";
import { StateType } from "../../types/Types";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: StateType) => state.user.userinfo);
  return (
    <>
      <div>
        <div className="navbar">
          <div className="dashboard">
            <img src={dashboard} alt="" className="dashboard-image" />
            <div className="dashboard-title">Dashboard</div>
          </div>
          <div>
            <button
              className="logout-btn"
              onClick={() => {
                dispatch(logout());
                navigate("/signup");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="container">
          <div className="boxes">
            <div className="box">
              <img src={user.profile} alt="" />
              <p>{user.name}</p>
              <h3>{user.email}</h3>
              <h4>Phone No. {user.phonenumber}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
