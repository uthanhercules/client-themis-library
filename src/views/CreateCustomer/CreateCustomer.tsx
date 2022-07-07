import './createCustomer.scss';
import { Heading, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerService } from '../../services/customerService';
import { IApiResponse } from '../../types/routeTypes';

const CreateCustomer = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [created, setCreated] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await customerService.createCustomer({
      full_name: fullName,
      email,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Cliente registrado com sucesso!');
    setCreated(true);
  };

  return (
    <article className='new-customer'>
      {created ? <Navigate to='/clientes' /> : null}
      <section className='content'>
        <Heading as='h1'>Criar Novo Cliente</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input
            type='text'
            placeholder='Nome Completo'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit' colorScheme='teal'>
            Registrar Novo Cliente
          </Button>
        </form>
      </section>
    </article>
  );
};

export default CreateCustomer;
