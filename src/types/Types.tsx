export interface Usertype {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profile: string;
}

export interface StateType {
  user: {
    islogin: false;
    userinfo: {
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
      profile: string;
    };
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface MyFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profile: string;
}
