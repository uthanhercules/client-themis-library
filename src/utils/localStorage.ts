export const deleteToken = () => {
  localStorage.removeItem('userToken');
};

export const getToken = () => {
  return localStorage.getItem('userToken');
};
