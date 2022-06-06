const BASE_URL = 'http://localhost:8000';

interface INewCustomer {
  full_name: string;
  email: string;
}

async function getAllCustomers(userToken: string) {
  const response = await fetch(BASE_URL + '/customer', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function deleteCustomer(id: string, userToken: string) {
  const response = await fetch(BASE_URL + '/customer/delete', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
    body: JSON.stringify({
      id,
    }),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function updateCustomer(data: any, userToken: string) {
  const response = await fetch(BASE_URL + '/customer/update', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function createNewCustomer(data: INewCustomer, userToken: string) {
  const response = await fetch(BASE_URL + '/customer/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function getUserById(id: string, userToken: string) {
  const response = await fetch(BASE_URL + '/customer/' + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = {
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getUserById,
};

export default output;
