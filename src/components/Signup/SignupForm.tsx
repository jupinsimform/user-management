import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MyFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(15, "At least 15 characters are required!"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^\+91[1-9]\d{9}$/, "Invalid phone number"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords do not match"),
});

function SignupForm() {
  const initialValues: MyFormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: MyFormValues) => {};
  return (
    <div className="signup-form">
      <div className="signup">SignUp</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="main-form">
          <div className="form-field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <Field type="text" id="name" name="name" className="input-field" />
            <ErrorMessage name="name" component="div" className="error-msg" />
          </div>
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
            <label htmlFor="phoneNumber" className="label">
              PhoneNo
            </label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="input-field"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error-msg"
            />
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
          <div className="form-field">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input-field"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-msg"
            />
          </div>

          <div className="btns">
            <button type="submit" className="submitBtn">
              Submit
            </button>
            <button type="reset" className="resetBtn">
              Reset
            </button>
          </div>
        </Form>
      </Formik>
      <div>
        <div className="login-text">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
