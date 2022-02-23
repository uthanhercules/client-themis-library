import React from 'react';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';

import ApiService from '../../services/apiService';
import LoginInput from '../../components/LoginInput';

const { useState } = React;

const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  async function login(userLogin: string, psw: string) {
    const { data, ok } = await ApiService.noAuthPost('/admin/login', { username: userLogin, password: psw });

    if (!ok) {
      toast.error(data);
      return;
    }

    localStorage.setItem('userToken', data.token);
    setAuth(true);
    toast.success('Login realizado com sucesso!');
  }

  return (
    <main className="App-Login">
      {auth ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      <h1>Login</h1>
      <LoginInput type="text" placeholder="Usuário" action={setUsername} />
      <LoginInput type="password" placeholder="Senha" action={setPassword} />
      <Link className="forgot-password" to="/dashboard">Esqueci minha senha</Link>
      <button type="button" onClick={() => login(username, password)}>Entrar</button>
    </main>
  );
};

export default index;
