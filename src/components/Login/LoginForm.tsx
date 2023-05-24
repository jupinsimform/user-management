import { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/feature/userSlice";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Usertype, LoginFormValues } from "../../types/Types";
import { toast, Slide } from "react-toastify";
import Show from "../../assets/showpassword.svg";
import Hide from "../../assets/hidepassword.svg";

// Define validation schema using Yup
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

  // Function to navigate to signup page
  const navigateToSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  // Toggle password visibility
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, [showPassword]);

  // Handle form submission
  const handleSubmit = useCallback(
    (
      values: LoginFormValues,
      { resetForm }: FormikHelpers<LoginFormValues>
    ) => {
      // Get stored users from local storage
      const storedUsers = localStorage.getItem("users");
      const users: Usertype[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if the user exists
      const isRegister: Usertype[] = users!.filter(
        (user: Usertype) => user.email === values.email
      );

      if (!isRegister) {
        // User does not exist, show error toast
        toast.error("User Does Not Exist", {
          position: toast.POSITION.TOP_RIGHT,
          transition: Slide,
          autoClose: 1000,
        });
        return;
      } else {
        // User exists, check password validity
        const user = users.filter(
          (user: Usertype) =>
            user.email === values.email && user.password === values.password
        );
        if (user.length !== 0) {
          // Password is correct, dispatch login action, navigate to home, and reset form
          dispatch(loginUser(values));
          navigate("/");
          resetForm();
        } else {
          // Wrong password, show warning toast
          toast.warn("Wrong Password", {
            position: toast.POSITION.TOP_RIGHT,
            transition: Slide,
            autoClose: 1000,
          });
          navigate("/login");
        }
      }
    },
    [dispatch, navigate]
  );
  return (
    <div className="login-form">
      <div className="login">Login</div>
      <Formik
        initialValues={{ email: "", password: "" }}
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
                onClick={handleTogglePassword}
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-msg"
            />
          </div>
          <div className="btns">
            <button type="submit" className="loginButton">
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <div>
        <div className="signup-text">
          Create an account ?
          <a onClick={navigateToSignup}>
            <span>SignUp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginForm);
