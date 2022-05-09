/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import "./style.scss";

const index = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Criar Novo Cliente</h1>
      <form action="console.log('Submit!')" className="new-procedure-data">
        <Input
          className="g-input"
          type="text"
          placeholder="Nome Completo"
          action={setFullName}
        />
        <Input
          className="g-input"
          type="email"
          placeholder="E-mail"
          action={setEmail}
        />
        <button>Criar Novo Cliente</button>
      </form>
    </article>
  );
};

export default index;
