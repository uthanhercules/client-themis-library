const BASE_URL = "http://localhost:8000";

async function getFiveLastProcedures(userToken: string) {
  const response = await fetch(BASE_URL + "/procedure/list-recent", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      userToken,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

const output =  {getFiveLastProcedures};

export default output;
