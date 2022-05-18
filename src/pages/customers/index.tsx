import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
import CustumerListItem from "../../shared/components/CustumerListItem";
import apiService from "../../shared/services/allCustomerService";
import "./style.scss";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    getCustomerData();
  }, []);

  async function getCustomerData() {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) return;
    const { data, ok } = await apiService.getAllCustomers(userToken);

    if (!ok) {
      toast.error(data);
      localStorage.removeItem("userToken");
      return (window.location.href = "/login");
    }

    return setCustomerList(data);
  }

  if (createNew) {
    return <Navigate to="/clientes/novo" />;
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
        <button type="button" onClick={() => setCreateNew(true)}>+ Novo Cliente</button>
      </article>
      <article className="customers-list">
        <header>
          <span className="customer-fullName">Nome Completo</span>
          <span className="customer-email">Email</span>
          <span className="customer-edit"></span>
          <span className="customer-delete"></span>
        </header>
        {customerList.map((cust: any) => (
          <CustumerListItem
            key={cust.id + cust.full_name}
            itemId={cust.id}
            fullName={cust.full_name}
            email={cust.email}
            customerList={customerList}
            setCustomerList={setCustomerList}
          />
        ))}
      </article>
    </main>
  );
};

export default Customer;
