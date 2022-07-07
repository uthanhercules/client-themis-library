export interface ILogin {
  login: string;
  password: string;
}

export interface INewPassword {
  login: string;
  password: string;
  recoveryKey: string;
}

export interface IEditAdmin {
  id: string;
  login: string;
  email: string;
  password: string;
}
