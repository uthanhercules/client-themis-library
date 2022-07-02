import { getToken } from '../utils/localStorage';
import { toast } from 'react-toastify';
const BASE_URL = 'http://localhost:8000';

const verifyAuth = async () => {
  const userToken = getToken();

  if (!userToken) {
    toast.error('Você precisa estar logado para fazer isso!');
    return (window.location.href = '/login');
  }

  const response = await fetch(`${BASE_URL}/auth-verify`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      userToken,
    },
  });

  if (!response.ok) {
    toast.error('Você precisa estar logado para fazer isso!');
    return (window.location.href = '/login');
  }
};

export { verifyAuth };
