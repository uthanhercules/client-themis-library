import { ILogin, INewPassword, IEditAdmin } from '../types/adminServiceTypes';
import { getToken } from '../utils/localStorage';
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

const editAdmin = async (data: IEditAdmin) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/admin/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const getAdminById = async (id: string) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/admin/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

export const adminService = {
  login,
  newPassword,
  editAdmin,
  getAdminById,
};
