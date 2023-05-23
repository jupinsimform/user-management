import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/Signup/SignupPage";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import { StateType } from "./types/Types";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const islogin = useSelector((state: StateType) => state.user.islogin);

  return (
    <div className="main-app">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={islogin ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!islogin ? <SignupPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!islogin ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
