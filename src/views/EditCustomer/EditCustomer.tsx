import './editCustomer.scss';
import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { customerService } from '../../services/customerService';
import { IApiResponse } from '../../types/routeTypes';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';

const EditCustomer = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [created, setCreated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProcedureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return <Navigate to='/clientes' />;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await customerService.editCustomer({
      customer_id: id,
      full_name: fullName,
      email,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo criado com sucesso!');
    setCreated(true);
  };

  const loadProcedureData = async () => {
    const api: IApiResponse = await customerService.getCustomerById(id);

    if (!api.ok) return toast.error(api.data);

    setEmail(api.data[0].email);
    setFullName(api.data[0].full_name);
  };

  return (
    <article className='edit-customer'>
      {created ? <Navigate to='/clientes' /> : null}
      <section className='content'>
        <Heading as='h1'>Editar Cliente</Heading>
        <form onSubmit={handleFormSubmit}>
          <div className='inputs'>
            <MainInput
              type='text'
              placeholder='Nome Completo'
              value={fullName}
              action={setFullName}
            />
            <MainInput
              type='text'
              placeholder='E-mail'
              value={email}
              action={setEmail}
            />
          </div>
          <MainButton type='submit' label='Registrar Novo Cliente' />
        </form>
      </section>
    </article>
  );
};

export default EditCustomer;
