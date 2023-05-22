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
        <div className="image">
          <img src={image} alt="" className="signupImage" />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
