import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/feature/userSlice";
import "./Home.css";

interface StateType {
  user: {
    islogin: false;
    userinfo: {
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
      profile: string;
    };
  };
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: StateType) => state.user.userinfo);
  return (
    <>
      <div>
        <div className="navbar">
          <div className="dashboard-title">Dashboard</div>
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
              <p>Hello {user.name}</p>
              <img src={user.profile} alt="" />
              <h3>{user.email}</h3>
              <h4>Phone No. {user.phoneNumber}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
