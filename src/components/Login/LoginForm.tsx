import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/feature/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
}

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
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  function navigateToSignup() {
    navigate("/signup");
  }

  const handleSubmit = (values: LoginFormValues) => {
    const storedUsers = localStorage.getItem("users");
    const users: Usertype[] = storedUsers ? JSON.parse(storedUsers) : [];

    const isRegister: Usertype[] = users!.filter(
      (user: Usertype) => user.email === values.email
    );

    if (isRegister.length == 0) {
      alert("user does not exist");
      return;
    } else {
      const user = users.filter(
        (user: Usertype) =>
          user.email === values.email && user.password === values.password
      );
      if (user.length !== 0) {
        dispatch(loginUser(values));
        navigate("/");
      } else {
        alert("invalide credentials");
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
              name="email"
              className="input-field"
            />
            <ErrorMessage name="email" component="div" className="error-msg" />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="input-field"
            />
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
          Create an account? <a onClick={navigateToSignup}>SignUp</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
