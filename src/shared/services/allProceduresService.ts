const BASE_URL = "http://localhost:8000";

async function getAllProcedures(userToken: string) {
  const response = await fetch(`${BASE_URL}/procedure`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { getAllProcedures };

export default output;
