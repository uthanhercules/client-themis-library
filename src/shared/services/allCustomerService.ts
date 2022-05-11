const BASE_URL = "http://localhost:8000";

async function getAllCustomers(userToken: string) {
  const response = await fetch(`${BASE_URL}/customer`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { getAllCustomers };

export default output;
