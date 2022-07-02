export const deleteToken = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('id');
};

export const getToken = () => {
  return localStorage.getItem('userToken');
};

export const createToken = (jwt: string) => {
  return localStorage.setItem('userToken', jwt);
};

export const setAdminId = (id: string) => {
  return localStorage.setItem('adminId', id);
};
