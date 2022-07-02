import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from '@chakra-ui/react';
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
  const [show, setShow] = useState(false);

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
        <form className='inputs' onSubmit={(e) => resetPassword(e)}>
          <Input
            variant='flushed'
            placeholder='Usuário'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputGroup>
            <Input
              variant='flushed'
              type={show ? 'text' : 'password'}
              placeholder='Nova Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button size='sm' onClick={() => setShow(!show)}>
                {show ? 'Esconder' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Input
            variant='flushed'
            placeholder='Código de Recuperação'
            value={recoveryKey}
            onChange={(e) => setRecoveryKey(e.target.value)}
          />
          <Link as={NavLink} to='/login'>
            Voltar ao Login
          </Link>
          <Button className='submit-button' type='submit' colorScheme='teal'>
            Redefinir Senha
          </Button>
        </form>
      </section>
    </article>
  );
};

export default NewPassword;
