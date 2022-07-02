import './editProcedure.scss';
import { Heading, Input, Button, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { procedureService } from '../../services/procedureService';

const EditProcedure = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [procedureNumber, setProcedureNumber] = useState('');
  const [procedureName, setProcedureName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(['']);
  const [created, setCreated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProcedureData();
    console.log(procedureNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return <Navigate to='/processos' />;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerId || !procedureName || !procedureNumber || !description) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: any = await procedureService.editProcedure({
      id: id,
      customer_id: customerId,
      customer_name: customerName,
      procedure_number: procedureNumber,
      name: procedureName,
      description,
      files: JSON.stringify(files),
      finished: false,
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo criado com sucesso!');
    setCreated(true);
  };

  const loadProcedureData = async () => {
    const api: any = await procedureService.getProcedureById(id);

    if (!api.ok) return toast.error(api.data);

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
          <Input
            type='number'
            placeholder='Número do Processo*'
            value={procedureNumber}
            onChange={(e: any) => setProcedureNumber(e.target.value)}
          />
          <Input
            type='text'
            placeholder='Nome do Processo*'
            value={procedureName}
            onChange={(e: any) => setProcedureName(e.target.value)}
          />
          <Textarea
            placeholder='Descrição do Processo*'
            rows={5}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          ></Textarea>
          <Input
            className='g-input'
            type='text'
            placeholder='Links do Drive (Separe-os com vírgulas)'
            value={files}
            onChange={(e: any) => setFiles(e.target.value.split(','))}
          />
          <Button type='submit' colorScheme='teal'>
            Registrar Novo Cliente
          </Button>
        </form>
      </section>
    </article>
  );
};

export default EditProcedure;
