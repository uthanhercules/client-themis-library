const BASE_URL = 'http://localhost:8000';

interface INewProcedure {
  customer_id: string;
  customer_name: string;
  procedure_number: string;
  name: string;
  description: string;
  files: string;
}

async function createNewProcedure(data: INewProcedure) {
  const response = await fetch(BASE_URL + '/procedure/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function getAllProcedures(userToken: string) {
  const response = await fetch(BASE_URL + '/procedure', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function getProcedureByNumber(
  userToken: string,
  procedureNumber: string
) {
  const response = await fetch(BASE_URL + '/procedure/' + procedureNumber, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function deleteProcedure(userToken: string, procedureNumber: string) {
  const response = await fetch(BASE_URL + '/procedure/delete', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
    body: JSON.stringify({
      procedure_number: procedureNumber,
    }),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function createProcedure(userToken: string, data: any) {
  const response = await fetch(BASE_URL + '/procedure/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function editProcedure(userToken: string, data: any) {
  const response = await fetch(BASE_URL + '/procedure/update', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function getFiveLastProcedures(userToken: string) {
  const response = await fetch(BASE_URL + '/procedure/list-recent', {
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
  createNewProcedure,
  editProcedure,
  createProcedure,
  deleteProcedure,
  getProcedureByNumber,
  getAllProcedures,
  getFiveLastProcedures,
};

export default output;
