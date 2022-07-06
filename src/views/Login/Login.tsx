import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import MainInput from '../../components/MainInput/MainInput';
import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from '@chakra-ui/react';
import { adminService } from '../../services/adminService';

import './login.scss';
import { toast } from 'react-toastify';
import { createToken, setAdminId } from '../../utils/localStorage';
import { IApiResponse } from '../../types/routeTypes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logedIn, setLogedIn] = useState(false);
  const [show, setShow] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await adminService.login({
      login: username,
      password,
    });
    if (!api.ok) return toast.error(api.data);

    toast.success('Login realizado com sucesso!');
    createToken(api.data.token);
    setAdminId(api.data.id);
    setLogedIn(true);
  };

  return (
    <article className='login'>
      {logedIn ? <Navigate to='/painel' /> : null}
      <section className='content'>
        <Heading as='h1'>Login</Heading>
        <form className='inputs' onSubmit={(e) => login(e)}>
          <MainInput
            type='text'
            placeholder='Usuário'
            value={username}
            action={setUsername}
          />
          <MainInput
            type='password'
            placeholder='Senha'
            value={password}
            action={setPassword}
          />
          <Link as={NavLink} to='/redefinir-senha'>
            Esqueci a Senha
          </Link>
          <Button className='submit-button' type='submit' colorScheme='teal'>
            Login
          </Button>
        </form>
      </section>
    </article>
  );
};

export default Login;
