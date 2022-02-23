const BASE_URL = 'http://localhost:8000';

async function noAuthPost(point: string, data: object) {
  const response = await fetch(BASE_URL + point, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  noAuthPost,
};
