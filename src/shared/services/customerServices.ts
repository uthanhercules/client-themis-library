const BASE_URL = "http://localhost:8000";

interface ICreateNewCustomer {
  full_name: string;
  email: string;
}

async function createNewCustomer(data: ICreateNewCustomer, userToken: string) {
  const response = await fetch(BASE_URL + "/customer/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { createNewCustomer };

export default output;
