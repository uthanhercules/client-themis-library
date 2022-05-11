const BASE_URL = "http://localhost:8000";

interface IChangePassword {
  login: string;
  password: string;
  recoveryKey: string;
}

async function changePasswordService(data: IChangePassword) {
  const response = await fetch(BASE_URL + "/new-password", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output = { changePasswordService };

export default output;
