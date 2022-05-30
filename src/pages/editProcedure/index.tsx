/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import Input from "../../shared/components/LoginInput";
import procedureService from "../../shared/services/procedureServices";
import "./style.scss";

const index = () => {
  const [procedureId, setProcedureId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [procedureNumber, setProcedureNumber] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProcedureData();
  }, []);

  async function loadProcedureData() {
    const userToken = localStorage.getItem("userToken");

    if (!id || !userToken) return;

    const { data, ok } = await procedureService.getProcedureByNumber(
      userToken,
      id
    );

    if (!ok) return toast.error(data);

    setProcedureId(data[0].id);
    setCustomerId(data[0].customer_id);
    setCustomerName(data[0].customer_name);
    setProcedureNumber(data[0].procedure_number);
    setProcedureName(data[0].name);
    setDescription(data[0].description);
    setFiles(data[0].files.length ? data[0].files.join(", ") : "");
    setLoaded(true);
  }

  async function editProcedure(e: any) {
    e.preventDefault();

    if (!procedureNumber.trim())
      return toast.error("Número do Processo é um campo obrigatório.");
    if (procedureNumber.length < 20)
      return toast.error("Número do Processo precisa ter 20 dígitos.");
    if (!procedureName.trim())
      return toast.error("Nome do processo é um campo obrigatório.");
    if (!description.trim())
      return toast.error("Descrição é um campo obrigatório.");

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.error("Você precisa estar logado para fazer isso!");
      return (window.location.href = "/login");
    }

    try {
      const { data, ok } = await procedureService.editProcedure(userToken, {
        id: procedureId,
        customer_id: customerId,
        customer_name: customerName,
        procedure_number: procedureNumber,
        name: procedureName,
        description,
        files,
        finished: false,
      });

      if (!ok) return toast.error(data);
    } catch (err: any) {
      return toast.error(err);
    }

    setTimeout(() => (window.location.href = "/processos"), 2000);
    return toast.success("Processo editado com sucesso!");
  }

  return (
    <article className="new-procedure-page">
      <Header />
      <h1>Editar Processo</h1>
      <form className="new-procedure-data">
        <section className="name-number">
          <Input
            className="g-input"
            type="number"
            placeholder="Número do Processo*"
            value={procedureNumber}
            action={setProcedureNumber}
          />
          <Input
            className="g-input name"
            type="text"
            placeholder="Nome do Processo*"
            value={procedureName}
            action={setProcedureName}
          />
        </section>
        <textarea
          placeholder="Descrição do Processo*"
          rows={5}
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        ></textarea>
        <Input
          className="g-input"
          type="text"
          placeholder="Links do Drive (Separe-os com vírgulas)"
          value={files}
          action={setFiles}
        />
        <button onClick={(e: any) => editProcedure(e)}>Editar Processo</button>
      </form>
    </article>
  );
};

export default index;
