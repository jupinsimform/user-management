import { createSlice } from "@reduxjs/toolkit";

interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
}

const users: Usertype[] = JSON.parse(localStorage.getItem("users")!) || [];

const initialState = JSON.parse(localStorage.getItem("loginData")!) || {
  islogin: false,
  userinfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupUser(state, action) {
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
    },
    loginUser(state, action) {
      users.map((user: Usertype) => {
        if (
          user.email === action.payload.email &&
          user.password === action.payload.password
        ) {
          state.userinfo = user;
          state.islogin = true;
        }
      });
      localStorage.setItem("loginData", JSON.stringify(state));
    },
    logout(state) {
      (state.userinfo = {}), (state.islogin = false);
      localStorage.setItem("loginData", JSON.stringify(state));
    },
  },
});

export const { signupUser, loginUser, logout } = userSlice.actions;
export default userSlice.reducer;
