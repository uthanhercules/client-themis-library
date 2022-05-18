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

async function deleteCustomer(id: string, userToken: string) {
  const response = await fetch(`${BASE_URL}/customer/delete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      userToken,
    },
    body: JSON.stringify({
      id,
    }),
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function updateCustomer(userToken: string) {
  const response = await fetch(`${BASE_URL}/customer/update`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { getAllCustomers, deleteCustomer, updateCustomer };

export default output;
