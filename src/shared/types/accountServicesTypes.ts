interface ILogin {
  login: string,
  password: string,
}

interface IChangePassword {
  login: string,
  password: string,
  recoveryKey: string,
}

export type {
  ILogin,
  IChangePassword,
};
