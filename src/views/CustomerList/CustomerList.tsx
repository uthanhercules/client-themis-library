import './customerList.scss';
import { Navigate } from 'react-router-dom';
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { customerService } from '../../services/customerService';
import { ICustomer } from '../../types/customerTypes';

const CustomerList = () => {
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
      return (window.location.href = '/login');
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
    <article className='procedure-list'>
      <section className='content'>
        <Heading as='h1'>Lista de Clientes</Heading>
        <Input
          placeholder='Pesquisar Cliente'
          onChange={(e: any) => setSearchCustomer(e.target.value)}
        />
        <Button
          type='button'
          colorScheme='teal'
          onClick={() => setCreateNew(true)}
        >
          Criar novo Cliente
        </Button>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Nome Completo</Th>
                <Th>E-mail</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {customerList.map((item: ICustomer) => {
                return (
                  <Tr key={item.id} className='customer-item'>
                    <Td>{item.full_name}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      <button
                        onClick={() => {
                          setCurrentId(item.id);
                          setEditCustomer(true);
                        }}
                      >
                        <EditIcon />
                      </button>
                    </Td>
                    <Td>
                      <button onClick={() => handleDeleteButton(item.id)}>
                        <DeleteIcon />
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </section>
    </article>
  );
};

export default CustomerList;
