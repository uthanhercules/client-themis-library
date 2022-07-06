import { verifyAuth } from '../../services/authService';
import { Navigate } from 'react-router-dom';
import ActionButton from './components/ActionButton/ActionButton';
import NewCustomerIcon from '../../assets/newClient.svg';
import NewProcedureIcon from '../../assets/newLawsuit.svg';
import EditAdminDataIcon from '../../assets/editAdminData.svg';
import ProcedureList from '../../components/ProcedureList/ProcedureList';
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
  if (editMyData) return <Navigate to={`/admin/editar`} />;

  return (
    <article className='home'>
      <section className='content'>
        <Heading as='h1'>Painel de Controle</Heading>
        <section className='action-buttons'>
          <ActionButton
            icon={NewProcedureIcon}
            alt='Botão para Criar novo Processo'
            label='Novo Processo'
            action={() => setNewProcedure(true)}
            color='#2C99FF'
          />
          <ActionButton
            icon={NewCustomerIcon}
            alt='Botão para Criar novo Cliente'
            label='Novo Cliente'
            action={() => setNewClient(true)}
            color='#20C997'
          />
          <ActionButton
            icon={EditAdminDataIcon}
            alt='Botão para Editar seus Dados'
            label='Editar meus Dados'
            action={() => setEditMyData(true)}
            color='#FA8B0C'
          />
        </section>
        <Heading as='h2'>Últimos processos atualizados</Heading>
        <ProcedureList lawsuitList={lastProceduresList} />
      </section>
    </article>
  );
}

export default Home;
