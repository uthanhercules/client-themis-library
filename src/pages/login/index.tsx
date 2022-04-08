import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './style.scss';

import ApiService from '../../shared/services/accountServices';
import LoginInput from '../../shared/components/LoginInput';

const index = () => {
  useEffect(() => {
    const isAuth = localStorage.getItem('userToken');
    if (isAuth) window.location.href = '/painel';
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    if (username.trim() === '') return toast.error('Usuário é um campo obrigatório');
    if (password.trim() === '') return toast.error('Senha é um campo obrigatório');
    const { data, ok } = await ApiService.loginService({ login: username, password });

    if (!ok) {
      return toast.error(data);
    }

    localStorage.setItem('userToken', data.token);
    toast.success('Login realizado com sucesso!');
    return setTimeout(() => { window.location.href = '/painel'; }, 2000);
  }

  return (
    <main className="App-Login">
      <article className="login-container">
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
