import './editAdminData.scss';
import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminService } from '../../services/adminService';
import { IApiResponse } from '../../types/routeTypes';
import { getAdminId } from '../../utils/localStorage';

function EditAdminData() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(false);

  const id = getAdminId();

  useEffect(() => {
    loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return <Navigate to='/painel' />;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!login || !email || !password) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await adminService.editAdmin({
      id,
      login,
      email,
      password,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Meus dados foram editados com sucesso!');
    setCreated(true);
  };

  const loadAdminData = async () => {
    const api: IApiResponse = await adminService.getAdminById(id);

    if (!api.ok) return toast.error(api.data);

    setLogin(api.data[0].login);
    setEmail(api.data[0].email);
  };

  return (
    <article className='edit-admin-data'>
      {created ? <Navigate to='/painel' /> : null}
      <section className='content'>
        <Heading as='h1'>Editar meus dados</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input
            type='text'
            placeholder='Login'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button type='submit' colorScheme='teal'>
            Editar Meu Dados
          </Button>
        </form>
      </section>
    </article>
  );
}

export default EditAdminData;
