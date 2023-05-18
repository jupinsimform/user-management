import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
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
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values: LoginFormValues) => {};
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
          Create an account? <a href="/signup">SignUp</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
