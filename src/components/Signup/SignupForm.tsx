import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/feature/userSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { MyFormValues } from "../../types/Types";
import { toast, Slide } from "react-toastify";
import Show from "../../assets/showpassword.svg";
import Hide from "../../assets/hidepassword.svg";

const initialValues: MyFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  profile: "",
};

function checkFilesType(files: File): boolean {
  let valid = true;
  if (files) {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(files.type)) {
      valid = false;
    }
  }
  return valid;
}

function checkFilesSize(files: File): boolean {
  let valid = true;
  if (files) {
    const size = files.size / 1024 / 1024;
    if (size > 2) {
      valid = false;
    }
  }
  return valid;
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
  profile: Yup.mixed()
    .required("Profile picture image is required")
    .test(
      "FILE_TYPE",
      "Invalid File Format! (Only Png,jpg allowed)",
      (value) => {
        if (value instanceof File) {
          return checkFilesType(value);
        }
      }
    )
    .test("FILE_SIZE", "Too Big! Image only upto 2mb allowed", (value) => {
      if (value instanceof File) {
        return checkFilesSize(value);
      }
    }),
});

function SignupForm() {
  const imgref = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgurl] = useState<string>("")!;
  const [showimg, setShowimg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateToLogin() {
    navigate("/login");
  }

  const handleSubmit = (
    values: MyFormValues,
    { resetForm }: FormikHelpers<MyFormValues>
  ) => {
    const storedUsers = localStorage.getItem("users");
    const users: MyFormValues[] = storedUsers ? JSON.parse(storedUsers) : [];

    const emailExists = users.some(
      (user: MyFormValues) => user.email === values.email
    );

    if (emailExists) {
      toast.error("this email is already registered", {
        position: toast.POSITION.TOP_RIGHT,
        transition: Slide,
        autoClose: 1000,
      });
      return;
    }
    values.profile = imgUrl;
    dispatch(signupUser(values));
    navigate("/");
    resetForm();
  };

  const handleReset = (
    event: React.MouseEvent<HTMLButtonElement>,
    { resetForm }: FormikHelpers<MyFormValues>
  ) => {
    event.preventDefault();
    resetForm();
    setImgurl("");
    setShowimg(false);
  };

  return (
    <div className="signup-form">
      <div className="signup">SignUp</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form className="main-form">
              <div className="profile">
                <label htmlFor="profile">+ Photo</label>
                {showimg ? (
                  <img src={imgUrl} alt="" className="profile-picture" />
                ) : (
                  ""
                )}
                <input
                  ref={imgref}
                  type="file"
                  id="profile"
                  name="profile"
                  hidden
                  onChange={(e) => {
                    setShowimg(true);
                    let image = e.target.files![0];
                    formik.setFieldValue("profile", image);
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files![0]);
                    reader.addEventListener("load", () => {
                      if (typeof reader.result === "string") {
                        setImgurl(reader.result);
                      }
                    });
                  }}
                />
                <ErrorMessage
                  name="profile"
                  component="div"
                  className="error-msg"
                />
              </div>
              <div className="form-field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  placeholder="Enter Full Name"
                  name="name"
                  className="input-field"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-msg"
                />
              </div>
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-msg"
                />
              </div>
              <div className="form-field">
                <label htmlFor="phoneNumber" className="label">
                  PhoneNo
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  placeholder="+91XXXXXXXXXX"
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
                <button type="submit" className="submitButton">
                  Submit
                </button>
                <button
                  type="reset"
                  className="resetButton"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div>
        <div className="login-text">
          Already have an account?
          <a onClick={navigateToLogin}>
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
