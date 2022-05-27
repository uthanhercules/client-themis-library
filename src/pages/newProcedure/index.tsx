/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import apiService from "../../shared/services/customerServices";
import "./style.scss";

const index = () => {
  const [customerId, setCustomerId] = useState("");
  const [procedureNumber, setProcedureNumber] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.error("Você precisa estar logado para fazer isso!");
      return (window.location.href = "/login");
    }

    try {
      const { data, ok } = await apiService.getCustomers(userToken);

      if (!ok) return toast.error(data);

      setCustomerList(data);
    } catch (err: any) {
      return toast.error(err);
    }
  }

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
            className="g-input name"
            type="text"
            placeholder="Nome do Processo"
            action={setProcedureName}
          />
          <select
            defaultValue=""
            onChange={(e: any) => setCustomerId(e.target.value)}
          >
            <option value="" hidden disabled>
              Selecione um cliente
            </option>
            {customerList.map((customer: any) => {
              return (
                <option key={customer.id} value={customer.id}>
                  {customer.full_name}
                </option>
              );
            })}
          </select>
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
