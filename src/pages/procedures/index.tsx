/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
import ProcedureListItem from "../../shared/components/ProcedureListItem";
import apiService from "../../shared/services/allProceduresService";
import "./style.scss";

const index = () => {
  const [proceduresList, setProceduresList] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [searched, setSearched] = useState('');

  useEffect(() => {
    getProcedureData();
  }, []);
  
  useEffect(() => {
    const procedures = document.querySelectorAll('.procedure-item');
  
    procedures.forEach((procedure: any) => {
      procedure.style.display = 'flex';

      if (procedure.innerText.includes(searched)) return procedure.style.display = 'flex';

      return procedure.style.display = 'none';
    });

    console.log(procedures)
  }, [searched]);

  async function getProcedureData() {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) return;
    const { data, ok } = await apiService.getAllProcedures(userToken);

    if (!ok) {
      toast.error(data);
      localStorage.removeItem("userToken");
      return (window.location.href = "/login");
    }

    return setProceduresList(data);
  }

  if (createNew) {
    return <Navigate to="/processos/novo" />;
  }

  return (
    <main className="App-Procedures">
      <Header />
      <h1>Processos</h1>
      <article className="procedures-panel">
        <LoginInput
          className="login-input"
          type="text"
          placeholder="Buscar Processo"
          action={setSearched}
        />
        <button type="button" onClick={() => setCreateNew(true)}>
          + Novo Processo
        </button>
      </article>
      <article className="procedure-list">
        <header>
          <span className="procedure-number">Número</span>
          <span className="procedure-name">Nome</span>
          <span className="procedure-customer">Cliente</span>
          <span className="procedure-edit"></span>
          <span className="procedure-delete"></span>
        </header>
        {proceduresList.map((proc: any) => {
          const customerName = proc.customer_name.split(" ");
          const formatedCustomerName = `${customerName[0]} ${
            customerName[customerName.length - 1]
          }`;

          return (
            <ProcedureListItem
              key={proc.updated}
              procedureNumber={proc.procedure_number}
              name={proc.name}
              customer={formatedCustomerName}
            />
          );
        })}
      </article>
    </main>
  );
};

export default index;
