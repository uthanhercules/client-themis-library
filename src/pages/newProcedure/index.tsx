/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import apiService from "../../shared/services/customerService";
import procedureService from "../../shared/services/procedureServices";
import "./style.scss";

const index = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
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
      const { data, ok } = await apiService.getAllCustomers(userToken);

      if (!ok) return toast.error(data);

      setCustomerList(data);
    } catch (err: any) {
      return toast.error(err);
    }
  }

  async function createNewProcedure(e: any) {
    e.preventDefault();

    if (!procedureNumber.trim())
      return toast.error("Número do Processo é um campo obrigatório.");
    if (procedureNumber.length < 20)
      return toast.error("Número do Processo precisa ter 20 dígitos.");
    if (!procedureName.trim())
      return toast.error("Nome do processo é um campo obrigatório.");
    if (!customerId.trim()) return toast.error("Selecione um cliente.");
    if (!description.trim())
      return toast.error("Descrição é um campo obrigatório.");

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.error("Você precisa estar logado para fazer isso!");
      return (window.location.href = "/login");
    }

    try {
      const { data, ok } = await procedureService.createProcedure(userToken, {
        customer_id: customerId,
        customer_name: customerName,
        procedure_number: procedureNumber,
        name: procedureName,
        description,
        files: JSON.stringify(files),
      });

      if (!ok) return toast.error(data);
    } catch (err: any) {
      return toast.error(err);
    }

    setTimeout(() => (window.location.href = "/processos"), 2000);
    return toast.success("Processo criado com sucesso!");
  }

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Criar Novo Processo</h1>
      <form className="new-procedure-data">
        <section className="name-number">
          <Input
            className="g-input"
            type="number"
            placeholder="Número do Processo*"
            action={setProcedureNumber}
          />
          <Input
            className="g-input name"
            type="text"
            placeholder="Nome do Processo*"
            action={setProcedureName}
          />
          <select
            defaultValue=""
            onChange={(e: any) => {
              const actualIndex = e.target.options.selectedIndex;

              setCustomerId(e.target.value);
              setCustomerName(e.target.options[actualIndex].id);
            }}
          >
            <option value="" hidden disabled>
              Selecione um cliente*
            </option>
            {customerList.map((customer: any) => {
              return (
                <option
                  key={customer.id}
                  value={customer.id}
                  id={customer.full_name}
                >
                  {customer.full_name}
                </option>
              );
            })}
          </select>
        </section>
        <textarea
          placeholder="Descrição do Processo*"
          rows={5}
          onChange={(e: any) => setDescription(e.target.value)}
        ></textarea>
        <Input
          className="g-input"
          type="text"
          placeholder="Links do Drive (Separe-os com vírgulas)"
          action={setFiles}
        />
        <button onClick={(e: any) => createNewProcedure(e)}>
          Criar Novo Processo
        </button>
      </form>
    </article>
  );
};

export default index;
