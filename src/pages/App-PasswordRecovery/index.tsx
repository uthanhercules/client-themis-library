import React from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import './style.scss';

import ApiService from '../../services/apiService';
import LoginInput from '../../components/LoginInput';

const { useState } = React;

const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState(false);

  async function recoverPassword() {
    if (username.trim() === '') return toast.error('Usuário é um campo obrigatório');
    if (password.trim() === '') return toast.error('Nova Senha é um campo obrigatório');
    if (recoveryKey.trim() === '') return toast.error('Código de Recuperação é um campo obrigatório');
    const { data, ok } = await ApiService.changePasswordService('/admin/new-password', { login: username, password, recoveryKey });

    if (!ok) {
      return toast.error(data);
    }

    setNewPassword(true);
    return toast.success('Troca de senha realizada com sucesso!');
  }

  return (
    <main className="App-PasswordRecovery">
      {newPassword ? <Navigate to="/" /> : null}
      <article className="recovery-container">
        <h1>Recuperar Senha</h1>
        <section className="recovery-inputs">
          <LoginInput className="input" type="text" placeholder="Usuário" action={setUsername} />
          <LoginInput className="input" type="password" placeholder="Nova Senha" action={setPassword} />
          <LoginInput className="input" type="password" placeholder="Código de Recuperação" action={setRecoveryKey} />
        </section>
        <Link className="return-login" to="/login">Retornar ao Login</Link>
        <button type="button" onClick={() => recoverPassword()}>Trocar Senha</button>
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
