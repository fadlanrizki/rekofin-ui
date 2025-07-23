type UserLoginRequestType = {
  username: string;
  password: string;
};

type UserLoginResponseType = {
  data: {
    username: string;
    fullname: string;
    token?: string;
    role: string;
  };
  message?: string;
};

type UserRegisterRequestType = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

type UserRegisterResponseType = {
    data: {
        username: string;
        fullName: string;
    }
    message: string
}
