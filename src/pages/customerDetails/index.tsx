import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import customerService from '../../shared/services/customerService';
import Header from '../../shared/components/Header';
import './style.scss';

const Index = () => {
  const [customer, setCustomer] = useState<any>({});
  const [procedures, setProcedures] = useState<any>([]);
  const { id } = useParams();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!id || !userToken) return;

    const { data, ok } = await customerService.getUserById(id, userToken);

    if (!ok) return;

    setCustomer(data[0]);
  };

  return (
    <article className='customer-details'>
      <Header />
      <section className='data'>
        <h1>{customer.full_name}</h1>
        <p>
          Código: <span>{customer.query_code}</span>
        </p>
        <p>
          E-mail: <span>{customer.email}</span>
        </p>
      </section>
      <section className='procedures'>
        <h2>Processos do Cliente</h2>
      </section>
    </article>
  );
};

export default Index;
