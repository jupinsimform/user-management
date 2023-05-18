import SignupForm from "./SignupForm";
import image from "../../assets/Form-Image.png";
import "./SignupPage.css";

function SignupPage() {
  return (
    <>
      <div className="main-signup-page">
        <div className="main-signup-form">
          <SignupForm />
        </div>
        <div className="img">
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
}

export default SignupPage;