import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
import CustumerListItem from "../../shared/components/CustumerListItem";
import apiService from "../../shared/services/allCustomerService";
import "./style.scss";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getCustomerData();
  }, []);

  async function getCustomerData() {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) return;
    // TODO - Refactor
    const { data, ok } = await apiService.getAllCustomers(userToken);

    if (!ok) {
      toast.error(data);
      localStorage.removeItem("userToken");
      return (window.location.href = "/login");
    }

    return setCustomerList(data);
  }

  return (
    <main className="App-Customers">
      <Header />
      <h1>Clientes</h1>
      <article className="customers-panel">
        <LoginInput
          className="login-input"
          type="text"
          placeholder="Buscar Cliente"
          action={() => console.log("Pesquisei")}
        />
        <button type="button">+ Novo Cliente</button>
      </article>
      <article className="customers-list">
        <header>
          <span className="customer-fullName">Nome Completo</span>
          <span className="customer-email">email</span>
          <span className="customer-edit"></span>
          <span className="customer-delete"></span>
        </header>
        {customerList.map((cust: any) => (
          <CustumerListItem
              key={cust.id}
              fullName={cust.full_name}
              email={cust.email}
            />
        ))}
      </article>
    </main>
  );
};

export default Customer;