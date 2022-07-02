export interface ILogin {
  login: string;
  password: string;
}

export interface INewPassword {
  login: string;
  passsword: string;
  recoveryKey: string;
}
