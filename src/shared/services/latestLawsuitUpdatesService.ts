const BASE_URL = 'http://localhost:8000/';

async function getFiveLastProcedures(point: string) {
  const response = await fetch(BASE_URL + point, {
    method: 'GET',
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  getFiveLastProcedures,
};
