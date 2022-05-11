/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import "./style.scss";

const index = () => {
  const [procedureNumber, setProcedureNumber] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Criar Novo Processo</h1>
      <form action="console.log('Submit!')" className="new-procedure-data">
        <section className="name-number">
          <Input
            className="g-input"
            type="number"
            placeholder="Número do Processo"
            action={setProcedureNumber}
          />
          <Input
            className="g-input"
            type="text"
            placeholder="Nome do Processo"
            action={setProcedureName}
          />
        </section>
        <textarea
          placeholder="Descrição do Processo"
          rows={5}
          onChange={(e: any) => setDescription(e.target.value)}
        ></textarea>
        <Input
          className="g-input"
          type="text"
          placeholder="Links do Drive (Separe-os com vírgulas)"
          action={setFiles}
        />
        <button>Criar Novo Processo</button>
      </form>
    </article>
  );
};

export default index;
