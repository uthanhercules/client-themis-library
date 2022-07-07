import './customerList.scss';
import { Navigate } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';
import CustomerListDetail from './components/CustomerListDetail/CustomerListDetail';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { customerService } from '../../services/customerService';
import { verifyAuth } from '../../services/authService';
import { deleteToken } from '../../utils/localStorage';

const CustomerList = () => {
  verifyAuth();
  const [customerList, setCustomerList] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [editCustomer, setEditCustomer] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const customers: NodeListOf<HTMLTableRowElement> =
      document.querySelectorAll('.customer-item');

    customers.forEach((customer: HTMLElement) => {
      const includesSearchedWord = customer.innerText
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());

      customer.classList.remove('hidden');

      if (includesSearchedWord) {
        customer.classList.remove('hidden');
        return;
      }

      return customer.classList.add('hidden');
    });
  }, [searchCustomer]);

  const loadCustomers = async () => {
    const api = await customerService.getAllCustomers();

    if (!api.ok) {
      toast.error('Você precisa estar logado para fazer isso!');
      deleteToken();
    }
    setCustomerList(api.data);
  };

  async function handleDeleteButton(id: string) {
    if (id !== currentId) {
      setCurrentId(id);
      return toast.warning('Clique mais uma vez para deletar permanentemente.');
    }

    const api = await customerService.deleteCustomer({
      id: currentId,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo deletado com sucesso!');
    loadCustomers();
  }

  if (editCustomer) return <Navigate to={`/clientes/editar/${currentId}`} />;
  if (createNew) return <Navigate to={`/clientes/novo`} />;

  return (
    <article className='customer-list'>
      <section className='content'>
        <Heading as='h1'>Lista de Clientes</Heading>
        <div className='action-bar'>
          <MainInput
            type='text'
            value={searchCustomer}
            action={setSearchCustomer}
            placeholder='Pesquisar'
          />
          <MainButton
            type='button'
            label='Novo cliente'
            action={() => setCreateNew(true)}
          />
        </div>
        <CustomerListDetail
          customerList={customerList}
          editAction={setEditCustomer}
          action={setCurrentId}
          deleteAction={handleDeleteButton}
        />
      </section>
    </article>
  );
};

export default CustomerList;
