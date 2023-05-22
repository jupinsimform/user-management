import LoginForm from "./LoginForm";
import image from "../../assets/Form-Image.png";
import "./LoginPage.css";

function LoginPage() {
  return (
    <>
      <div className="main-login-page">
        <div className="main-login-form">
          <LoginForm />
        </div>
        <div className="img">
          <img src={image} alt="" className="img-picture" />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
