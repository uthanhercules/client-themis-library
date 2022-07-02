import './procedureList.scss';
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { procedureService } from '../../services/procedureService';
import { toast } from 'react-toastify';
import { IProcedure } from '../../types/procedureTypes';

const ProcedureList = () => {
  const [proceduresList, setProceduresList] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [editProcedure, setEditProcedure] = useState(false);

  useEffect(() => {
    loadProcedures();
  }, []);

  const loadProcedures = async () => {
    const api = await procedureService.getUniqueProcedures();

    if (!api.ok) {
      toast.error('Você precisa estar logado para fazer isso!');
      return (window.location.href = '/login');
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

  return (
    <article className='procedure-list'>
      <section className='content'>
        <Heading as='h1'>Lista de Processos</Heading>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Número</Th>
                <Th>Nome</Th>
                <Th>Cliente</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {proceduresList.map((item: IProcedure) => {
                return (
                  <Tr key={item.procedure_number}>
                    <Td>{item.procedure_number}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.customer_name}</Td>
                    <Td>
                      <button
                        onClick={() => {
                          setCurrentId(item.procedure_number);
                          setEditProcedure(true);
                        }}
                      >
                        <EditIcon />
                      </button>
                    </Td>
                    <Td>
                      <button
                        onClick={() =>
                          handleDeleteButton(item.procedure_number)
                        }
                      >
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

export default ProcedureList;
