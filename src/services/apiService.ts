const BASE_URL = 'http://localhost:8000';

interface ILogin {
  login: string,
  password: string,
}

interface IChangePassword{
  login: string,
  password: string,
  recoveryKey: string,
}

async function loginService(point: string, data: ILogin) {
  const response = await fetch(BASE_URL + point, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function changePasswordService(point: string, data: IChangePassword) {
  const response = await fetch(BASE_URL + point, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  loginService,
  changePasswordService,
};
