export interface ILogin {
  login: string;
  password: string;
}

export interface INewPassword {
  login: string;
  password: string;
  recoveryKey: string;
}
