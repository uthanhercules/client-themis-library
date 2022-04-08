import { ILogin, IChangePassword } from '../types/accountServicesTypes';

const BASE_URL = 'http://localhost:8000';

async function loginService(data: ILogin) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function changePasswordService(data: IChangePassword) {
  const response = await fetch(`${BASE_URL}/new-password`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function verifyLogin(userToken: string) {
  const response = await fetch(`${BASE_URL}/auth-verify`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  loginService,
  changePasswordService,
  verifyLogin,
};
