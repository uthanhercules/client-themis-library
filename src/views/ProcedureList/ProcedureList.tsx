import './procedureList.scss';
import { Navigate } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';
import ProcedureListDetail from './ProcedureListDetail/ProcedureListDetail';
import { useEffect, useState } from 'react';
import { procedureService } from '../../services/procedureService';
import { toast } from 'react-toastify';
import { verifyAuth } from '../../services/authService';
import { deleteToken } from '../../utils/localStorage';

const ProcedureList = () => {
  verifyAuth();
  const [proceduresList, setProceduresList] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [editProcedure, setEditProcedure] = useState(false);
  const [searchProcedure, setSearchProcedure] = useState('');
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    loadProcedures();
  }, []);

  useEffect(() => {
    const procedures: NodeListOf<HTMLTableRowElement> =
      document.querySelectorAll('.procedure-item');

    procedures.forEach((procedure: HTMLElement) => {
      const includesSearchedWord = procedure.innerText
        .toLowerCase()
        .includes(searchProcedure.toLowerCase());

      procedure.classList.remove('hidden');

      if (includesSearchedWord) {
        procedure.classList.remove('hidden');
        return;
      }

      return procedure.classList.add('hidden');
    });
  }, [searchProcedure]);

  const loadProcedures = async () => {
    const api = await procedureService.getUniqueProcedures();

    if (!api.ok) {
      toast.error('Você precisa estar logado para fazer isso!');
      deleteToken();
    }
    setProceduresList(api.data);
  };

  async function handleDeleteButton(id: string) {
    if (id !== currentId) {
      setCurrentId(id);
      return toast.warning('Clique mais uma vez para deletar permanentemente.');
    }

    const api = await procedureService.deleteProcedure({
      procedure_number: currentId,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo deletado com sucesso!');
    loadProcedures();
  }

  if (editProcedure) return <Navigate to={`/processos/editar/${currentId}`} />;
  if (createNew) return <Navigate to={`/processos/novo`} />;

  return (
    <article className='procedure-list'>
      <section className='content'>
        <Heading as='h1'>Lista de Processos</Heading>
        <div className='action-bar'>
          <MainInput
            type='text'
            value={searchProcedure}
            action={setSearchProcedure}
            placeholder='Pesquisar'
          />
          <MainButton
            type='button'
            label='Novo processo'
            action={() => setCreateNew(true)}
          />
        </div>
        <ProcedureListDetail
          lawsuitList={proceduresList}
          action={setCurrentId}
          editAction={setEditProcedure}
          deleteAction={handleDeleteButton}
        />
      </section>
    </article>
  );
};

export default ProcedureList;
