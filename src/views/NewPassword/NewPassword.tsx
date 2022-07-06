import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';
import { Heading, Link } from '@chakra-ui/react';
import { adminService } from '../../services/adminService';

import './newPassword.scss';
import { toast } from 'react-toastify';
import { deleteToken } from '../../utils/localStorage';
import { IApiResponse } from '../../types/routeTypes';

const NewPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState(false);

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !recoveryKey.trim()) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await adminService.newPassword({
      login: username,
      password,
      recoveryKey,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Senha alterada com sucesso!');
    deleteToken();
    setNewPassword(true);
  };

  return (
    <article className='new-password'>
      {newPassword ? <Navigate to='/painel' /> : null}
      <section className='content'>
        <Heading as='h1'>Redefinir Senha</Heading>
        <form className='inputs' onSubmit={(e: any) => resetPassword(e)}>
          <MainInput
            type='text'
            placeholder='Usuário'
            value={username}
            action={setUsername}
          />
          <MainInput
            type='password'
            placeholder='Nova Senha'
            value={password}
            action={setPassword}
          />
          <MainInput
            type='password'
            placeholder='Código de Recuperação'
            value={recoveryKey}
            action={setRecoveryKey}
          />
          <Link as={NavLink} to='/login'>
            Voltar ao Login
          </Link>
          <MainButton type='submit' label='Redefinir Senha' />
        </form>
      </section>
    </article>
  );
};

export default NewPassword;
