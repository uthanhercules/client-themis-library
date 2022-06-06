const BASE_URL = 'http://localhost:8000';

interface ILogin {
  login: string;
  password: string;
}

interface IChangePassword {
  login: string;
  password: string;
  recoveryKey: string;
}

interface IAdminData {
  login: string;
  password: string;
  email: string;
}

async function loginService(data: ILogin) {
  const response = await fetch(BASE_URL + '/login', {
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
  const response = await fetch(BASE_URL + '/new-password', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function editAdminData(data: IAdminData) {
  const response = await fetch(BASE_URL + '/admin', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { loginService, changePasswordService, editAdminData };

export default output;
