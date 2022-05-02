import React from "react";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
import ProcedureListItem from "../../shared/components/ProcedureListItem";
import "./style.scss";

const index = () => {
  return (
    <main className="App-Procedures">
      <Header />
      <h1>Processos</h1>
      <article className="procedures-panel">
        <LoginInput
          className="login-input"
          type="text"
          placeholder="Buscar Processo"
          action={() => console.log("Pesquisei")}
        />
        <button type="button">+ Novo Processo</button>
      </article>
      <article className="procedure-list">
        <header>
          <span className="procedure-number">Número</span>
          <span className="procedure-name">Nome</span>
          <span className="procedure-customer">Cliente</span>
          <span className="procedure-edit"></span>
          <span className="procedure-delete"></span>
        </header>
        <ProcedureListItem
          procedureNumber="12345678901234567890"
          name="Processo contra o mundo inteirinhozinho"
          customer="Uthan Hercules"
        />
        <ProcedureListItem
          procedureNumber="12345678901234567890"
          name="Processo contra o mundo inteirinhozinho"
          customer="Uthan Hercules"
        />
        <ProcedureListItem
          procedureNumber="12345678901234567890"
          name="Processo contra o mundo inteirinhozinho"
          customer="Uthan Hercules"
        />
      </article>
    </main>
  );
};

export default index;
