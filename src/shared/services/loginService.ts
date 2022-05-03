const BASE_URL = "http://localhost:8000";

interface ILogin {
  login: string;
  password: string;
}

async function loginService(data: ILogin) {
  const response = await fetch(BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export default {
  loginService,
};
