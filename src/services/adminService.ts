import { ILogin, INewPassword } from '../types/adminServiceTypes';
const BASE_URL = 'https://nuneslisboa.herokuapp.com';

const login = async (data: ILogin) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const newPassword = async (data: INewPassword) => {
  const response = await fetch(`${BASE_URL}/new-password`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

export const adminService = { login, newPassword };
