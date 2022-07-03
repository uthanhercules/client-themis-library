import { verifyAuth } from '../../services/authService';
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
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteToken } from '../../utils/localStorage';
import { ILastProcedure } from '../../types/procedureTypes';
import { procedureService } from '../../services/procedureService';

import './home.scss';

function Home() {
  verifyAuth();
  const [lastProceduresList, setLastProceduresList] = useState([]);
  const [newProcedure, setNewProcedure] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [editMyData, setEditMyData] = useState(false);

  useEffect(() => {
    loadLastProcedures();
  }, []);

  const loadLastProcedures = async () => {
    const api = await procedureService.getLastProcedures();

    if (!api.ok) {
      toast.error(api.data);
      deleteToken();
    }

    setLastProceduresList(api.data);
  };

  if (newProcedure) return <Navigate to={`/processos/novo`} />;
  if (newClient) return <Navigate to={`/clientes/novo`} />;
  if (editMyData) return <Navigate to={`/clientes/novo`} />;

  return (
    <article className='home'>
      <section className='content'>
        <Heading as='h1'>Painel de Controle</Heading>
        <section className='action-buttons'>
         <Button 
         colorScheme='blue'
         onClick={() => setNewProcedure(true)}
         >
          Novo Processo
         </Button>
         <Button 
         colorScheme='blue'
         onClick={() => setNewClient(true)}
         >
          Novo Cliente
         </Button>
         <Button 
         colorScheme='blue'
         onClick={() => setEditMyData(true)}
         >
          Editar meus dados
         </Button>
        </section>
        <Heading as='h2'>Últimos processos atualizados</Heading>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Número</Th>
                <Th>Cliente</Th>
                <Th>Número do Processo</Th>
                <Th>Última Alteração</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lastProceduresList.map((item: ILastProcedure) => {
                return (
                  <Tr key={item.procedure_number} className='customer-item'>
                    <Td>{item.procedure_number}</Td>
                    <Td>{item.customer_name}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.updated}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </section>
    </article>
  );
}

export default Home;
