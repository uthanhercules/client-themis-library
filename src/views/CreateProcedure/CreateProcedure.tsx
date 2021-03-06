import './createProcedure.scss';
import { Heading, Input, Select, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerService } from '../../services/customerService';
import { ICustomer } from '../../types/customerTypes';
import { procedureService } from '../../services/procedureService';
import { IApiResponse } from '../../types/routeTypes';
import MainInput from '../../components/MainInput/MainInput';
import MainButton from '../../components/MainButton/MainButton';

const CreateProcedure = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [procedureNumber, setProcedureNumber] = useState('');
  const [procedureName, setProcedureName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(['']);
  const [customerList, setCustomerList] = useState([]);
  const [created, setCreated] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerId || !procedureName || !procedureNumber || !description) {
      return toast.error('Todos os campos são obrigatórios.');
    }

    const api: any = await procedureService.createProcedure({
      customer_id: customerId,
      customer_name: customerName,
      procedure_number: procedureNumber,
      name: procedureName,
      description,
      files: JSON.stringify(files),
    });

    if (!api.ok) return toast.error(api.data);

    toast.success('Processo criado com sucesso!');
    setCreated(true);
  };

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomers = async () => {
    const api: IApiResponse = await customerService.getAllCustomers();

    if (!api.ok) return toast.error(api.data);
    setCustomerList(api.data);
  };

  return (
    <article className='new-procedure'>
      {created ? <Navigate to='/processos' /> : null}
      <section className='content'>
        <Heading as='h1'>Criar Novo Processo</Heading>
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
            <Select
              className='select-input'
              placeholder='Selecione o Cliente'
              onChange={(e: any) => {
                const actualIndex = e.target.options.selectedIndex;

                setCustomerId(e.target.value);
                setCustomerName(e.target.options[actualIndex].innerText);
              }}
            >
              {customerList.map((item: ICustomer) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.full_name}
                  </option>
                );
              })}
            </Select>
          </div>
          <Textarea
            placeholder='Descrição do Processo*'
            rows={5}
            onChange={(e: any) => setDescription(e.target.value)}
          ></Textarea>
          <Input
            className='g-input'
            type='text'
            placeholder='Links do Drive (Separe-os com vírgulas)'
            onChange={(e: any) => setFiles(e.target.value.split(','))}
          />
          <MainButton type='submit' label='Criar Novo Processo' />
        </form>
      </section>
    </article>
  );
};

export default CreateProcedure;
