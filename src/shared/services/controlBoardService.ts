const BASE_URL = "http://localhost:8000/";

interface INewProcedure {
  customer_id: string;
  customer_name: string;
  procedure_number: string;
  name: string;
  description: string;
  files: string;
}

interface INewCustomer {
  full_name: string;
  email: string;
}

interface IAdminData {
  login: string;
  password: string;
  email: string;
}

async function createNewProcedure(point: string, data: INewProcedure) {
  const response = await fetch(BASE_URL + point, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function createNewCustomer(point: string, data: INewCustomer) {
  const response = await fetch(BASE_URL + point, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function editAdminData(point: string, data: IAdminData) {
  const response = await fetch(BASE_URL + point, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  createNewProcedure,
  createNewCustomer,
  editAdminData,
};
