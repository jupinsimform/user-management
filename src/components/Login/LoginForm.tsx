import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/feature/userSlice";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Usertype, LoginFormValues } from "../../types/Types";
import { toast, Slide } from "react-toastify";
import Show from "../../assets/showpassword.svg";
import Hide from "../../assets/hidepassword.svg";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  function navigateToSignup() {
    navigate("/signup");
  }

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    const storedUsers = localStorage.getItem("users");
    const users: Usertype[] = storedUsers ? JSON.parse(storedUsers) : [];

    const isRegister: Usertype[] = users!.filter(
      (user: Usertype) => user.email === values.email
    );

    if (isRegister.length == 0) {
      toast.error("User Does Not Exist", {
        position: toast.POSITION.TOP_RIGHT,
        transition: Slide,
        autoClose: 1000,
      });
      return;
    } else {
      const user = users.filter(
        (user: Usertype) =>
          user.email === values.email && user.password === values.password
      );
      if (user.length !== 0) {
        dispatch(loginUser(values));
        navigate("/");
        resetForm();
      } else {
        toast.warn("Wrong Password", {
          position: toast.POSITION.TOP_RIGHT,
          transition: Slide,
          autoClose: 1000,
        });
        navigate("/login");
      }
    }
  };
  return (
    <div className="login-form">
      <div className="login">Login</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="main-form">
          <div className="form-field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <Field
              type="text"
              id="email"
              placeholder="example@domain.com"
              name="email"
              className="input-field"
            />
            <ErrorMessage name="email" component="div" className="error-msg" />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="password-field">
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Must have atleast 8 character"
                name="password"
                className="input-field"
              />
              <img
                height={20}
                width={20}
                src={showPassword ? Show : Hide}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-msg"
            />
          </div>
          <div className="btns">
            <button type="submit" className="submitBtn">
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <div>
        <div className="signup-text">
          Create an account?{" "}
          <a onClick={navigateToSignup}>
            <span>SignUp</span>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
