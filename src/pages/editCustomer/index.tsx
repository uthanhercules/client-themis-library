/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import "./style.scss";

import userService from "../../shared/services/customerServices";
import customerUpdate from "../../shared/services/allCustomerService";

const index = () => {
  const [user, setUser] = useState<any>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    const userToken = localStorage.getItem("userToken");

    if (!id || !userToken) return;

    const { data, ok } = await userService.getUserById(id, userToken);

    if (!ok) return;

    setUser(data[0]);
    setFullName(data[0].full_name);
    setEmail(data[0].email);
    setLoaded(true);
  }

  async function editCustomer(e: any) {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    if (!userToken) return;

    const userData = {
      customer_id: user.id,
      full_name: fullName,
      email,
    };

    const { data, ok } = await customerUpdate.updateCustomer(
      userData,
      userToken
    );
    if (!ok) return;

    toast.success("Editado!");
    return;
  }

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Editar Cliente</h1>
      <form className="new-procedure-data">
        <Input
          value={fullName}
          className="g-input"
          type="text"
          placeholder="Nome Completo"
          action={setFullName}
        />
        <Input
          value={email}
          className="g-input"
          type="email"
          placeholder="E-mail"
          action={setEmail}
        />
        <button onClick={(e) => editCustomer(e)}>Criar Novo Cliente</button>
      </form>
    </article>
  );
};
export default index;
