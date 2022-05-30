/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import "./style.scss";

import customerServices from "../../shared/services/customerService";

const index = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  async function createCustomer(e: any) {
    e.preventDefault();

    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Você precisa estar logado para fazer isso.");
      localStorage.removeItem("userToken");
      return (window.location.href = "/login");
    }

    if (fullName.trim() === "")
      return toast.error("Nome Completo é um campo obrigatório");
    if (email.trim() === "")
      return toast.error("E-mail é um campo obrigatório");

    const { data, ok } = await customerServices.createNewCustomer(
      {
        full_name: fullName,
        email,
      },
      userToken
    );
    if (!ok) return toast.error(data);

    setTimeout(() => (window.location.href = "/clientes"), 2000);
    return toast.success("Cliente criado com sucesso!");
  }

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Criar Novo Cliente</h1>
      <form className="new-procedure-data">
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
        <button onClick={(e) => createCustomer(e)}>Criar Novo Cliente</button>
      </form>
    </article>
  );
};

export default index;
