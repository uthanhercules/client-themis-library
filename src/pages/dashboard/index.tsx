/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "./style.scss";

import Header from "../../shared/components/Header";
import ControlBoard from "../../shared/components/ControlBoard";
import LatestLawsuitUpdates from "../../shared/components/LatestLawsuitUpdates";

import NewLawsuitIconControlBoard from "../../shared/assets/newlawsuit.svg";
import NewNlientIconControlBoard from "../../shared/assets/newclient.svg";
import EditMyDataIconControlBoard from "../../shared/assets/editmydata.svg";

import ApiService from "../../shared/services/latestLawsuitUpdatesService";

const index = () => {
  const [lawsuitArray, setLawsuitArray] = useState([]);

  const controlBoard = [
    {
      id: 1,
      src: NewLawsuitIconControlBoard,
      alt: "Icon para novo processo",
      span: "Novo Processo",
      color: "#2C99FF",
      navLink: "/processos/novo",
    },
    {
      id: 2,
      src: NewNlientIconControlBoard,
      alt: "Icon de novo cliente",
      span: "Novo Cliente",
      color: "#20C997",
      navLink: "/clientes/novo",
    },
    {
      id: 3,
      src: EditMyDataIconControlBoard,
      alt: "Icon para edição de dados",
      span: "Editar meus Dados",
      color: "#FA8B0C",
      navLink: "/processos/novo",
    },
  ];

  const loadLawsuits = async () => {
    try {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        toast.error("Você precisa estar logado para fazer isso!");
        return (window.location.href = "/login");
      }

      const { data: lawsuitData, ok } = await ApiService.getFiveLastProcedures(
        userToken
      );

      if (!ok) {
        toast.error(lawsuitData);
        localStorage.removeItem("userToken");
        return (window.location.href = "/login");
      }

      return setLawsuitArray(lawsuitData);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    loadLawsuits();
  }, []);

  return (
    <main className="App-Dashboard">
      <article className="Container-Content">
        <Header />
        <section className="Controlboard">
          <h1>Painel de Controle</h1>
          <nav className="Each-Controlboard">
            {controlBoard.map((eachController) => (
              <NavLink to={eachController.navLink}>
                <ControlBoard
                  key={eachController.id}
                  src={eachController.src}
                  alt={eachController.alt}
                  span={eachController.span}
                  color={eachController.color}
                />
              </NavLink>
            ))}
          </nav>
        </section>
        <section className="Latest-Lawsuit-Updates">
          <h2>Últimos processos atualizados</h2>
          <article>
            <section className="Menu-Lawsuit">
              <span className="Number">número</span>
              <span className="Client">cliente</span>
              <span className="Lawsuit-Name">nome do processo</span>
              <span className="Last-Update">última alteração</span>
            </section>
            <section className="Lawsuit-Data">
              {lawsuitArray.map((eachLawsuit: any) => (
                <LatestLawsuitUpdates
                  key={eachLawsuit.procedure_number}
                  lawsuitNumber={eachLawsuit.procedure_number}
                  customerName={eachLawsuit.customer_name}
                  lawsuitName={eachLawsuit.name}
                  dateUpdated={eachLawsuit.updated}
                />
              ))}
            </section>
          </article>
        </section>
      </article>
    </main>
  );
};

export default index;
