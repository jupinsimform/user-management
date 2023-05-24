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
        <div className="image">
          <img src={image} alt="Form-Image" className="loginImage" />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
