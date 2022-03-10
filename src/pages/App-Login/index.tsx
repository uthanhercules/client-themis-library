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

  async function login() {
    if (username.trim() === '') return toast.error('Usuário é um campo obrigatório');
    if (password.trim() === '') return toast.error('Senha é um campo obrigatório');
    const { data, ok } = await ApiService.noAuthPost('/admin/login', { username, password });

    if (!ok) {
      return toast.error(data);
    }

    localStorage.setItem('userToken', data.token);
    setAuth(true);
    return toast.success('Login realizado com sucesso!');
  }

  return (
    <main className="App-Login">
      <article className="login-container">
        {auth ? <Redirect to="/dashboard" /> : null}
        <h1>Login</h1>
        <section className="login-inputs">
          <LoginInput className="input" type="text" placeholder="Usuário" action={setUsername} />
          <LoginInput className="input" type="password" placeholder="Senha" action={setPassword} />
        </section>
        <Link className="forgot-password" to="/recuperar-senha">Esqueci minha senha</Link>
        <button type="button" onClick={() => login()}>Entrar</button>
      </article>
      <span className="made-with-love">
        Feito com ♥
        {' '}
        <span>u.dev_</span>
      </span>
    </main>
  );
};

export default index;
