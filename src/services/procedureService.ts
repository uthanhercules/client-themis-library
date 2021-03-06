import {
  ICreateProcedures,
  IDeleteProcedureData,
  IEditProcedure,
} from '../types/procedureTypes';
import { getToken } from '../utils/localStorage';
const BASE_URL = 'https://nuneslisboa.herokuapp.com';

const getUniqueProcedures = async () => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const deleteProcedure = async (data: IDeleteProcedureData) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure/delete`, {
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

const getLastProcedures = async () => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure/list-recent`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

const createProcedure = async (data: ICreateProcedures) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure/create`, {
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

const editProcedure = async (data: IEditProcedure) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure/update`, {
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

const getProcedureById = async (id: string) => {
  const userToken = getToken();

  if (!userToken)
    return {
      data: 'Você precisa estar logado para fazer isso',
      ok: false,
    };

  const response = await fetch(`${BASE_URL}/procedure/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  const responseData = await response.json();
  return { data: responseData, ok: response.ok };
};

export const procedureService = {
  getUniqueProcedures,
  deleteProcedure,
  getLastProcedures,
  createProcedure,
  editProcedure,
  getProcedureById,
};
