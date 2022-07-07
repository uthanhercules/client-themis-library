import './editProcedure.scss';
import { Heading, Input, Button, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { procedureService } from '../../services/procedureService';
import { IApiResponse } from '../../types/routeTypes';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';

const EditProcedure = () => {
  const [procedureId, setProcedureId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [procedureNumber, setProcedureNumber] = useState('');
  const [procedureName, setProcedureName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('');
  const [created, setCreated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProcedureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return <Navigate to='/processos' />;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerId || !procedureName || !procedureNumber || !description) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: IApiResponse = await procedureService.editProcedure({
      id: procedureId,
      customer_id: customerId,
      customer_name: customerName,
      procedure_number: procedureNumber,
      name: procedureName,
      description,
      files: JSON.stringify(files.split(',')),
      finished: false,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo criado com sucesso!');
    setCreated(true);
  };

  const loadProcedureData = async () => {
    const api: IApiResponse = await procedureService.getProcedureById(id);

    if (!api.ok) return toast.error(api.data);

    setProcedureId(api.data[0].id);
    setCustomerId(api.data[0].customer_id);
    setProcedureNumber(api.data[0].procedure_number);
    setProcedureName(api.data[0].name);
    setCustomerName(api.data[0].customer_name);
    setDescription(api.data[0].description);
    setFiles(
      api.data[0].files.length ? JSON.parse(api.data[0].files).join(', ') : ''
    );
  };

  return (
    <article className='new-procedure'>
      {created ? <Navigate to='/processos' /> : null}
      <section className='content'>
        <Heading as='h1'>Editar Processo</Heading>
        <form onSubmit={handleFormSubmit}>
          <div className='inputs'>
            <MainInput
              type='number'
              placeholder='Número do Processo*'
              action={setProcedureNumber}
              value={procedureNumber}
            />
            <MainInput
              type='text'
              placeholder='Nome do Processo*'
              action={setProcedureName}
              value={procedureName}
            />
          </div>
          <Textarea
            placeholder='Descrição do Processo*'
            rows={5}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          ></Textarea>
          <Input
            className='g-input'
            type='text'
            value={files}
            placeholder='Links do Drive (Separe-os com vírgulas)'
            onChange={(e: any) => setFiles(e.target.value.split(','))}
          />
          <MainButton type='submit' label='Criar Novo Processo' />
        </form>
      </section>
    </article>
  );
};

export default EditProcedure;
