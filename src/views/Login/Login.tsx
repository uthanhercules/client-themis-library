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

import './login.scss';
import { toast } from 'react-toastify';
import { createToken, setAdminId } from '../../utils/localStorage';

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

    const api: any = await adminService.login({
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
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button size='sm' onClick={() => setShow(!show)}>
                {show ? 'Esconder' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Link as={NavLink} to='/redefinir-senha'>
            Esqueci minha Senha
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
