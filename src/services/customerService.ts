import { ICreateCustomer, IDeleteCustomerData } from '../types/customerTypes';
import { getToken } from '../utils/localStorage';
const BASE_URL = 'https://nuneslisboa.herokuapp.com';

const getAllCustomers = async () => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/customer`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const deleteCustomer = async (data: IDeleteCustomerData) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/customer/delete`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const createCustomer = async (data: ICreateCustomer) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/customer/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

export const customerService = {
  getAllCustomers,
  deleteCustomer,
  createCustomer,
};
