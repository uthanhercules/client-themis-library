import React from "react";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
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
    </main>
  );
};

export default index;
