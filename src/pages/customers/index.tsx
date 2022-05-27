import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../shared/components/Header";
import LoginInput from "../../shared/components/LoginInput";
import CustumerListItem from "../../shared/components/CustumerListItem";
import apiService from "../../shared/services/allCustomerService";
import "./style.scss";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getCustomerData();
  }, [updated]);

  useEffect(() => {
    getCustomerData();
  }, []);

  useEffect(() => {
    const customers = document.querySelectorAll(".customer-item");

    customers.forEach((customer: any) => {
      const includesSearchedWord = customer.innerText
        .toLowerCase()
        .includes(searchCustomer.toLowerCase());

      customer.style.display = "grid";
      if (includesSearchedWord) return (customer.style.display = "grid");

      return (customer.style.display = "none");
    });
  }, [searchCustomer]);

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
          action={setSearchCustomer}
        />
        <button type="button" onClick={() => setCreateNew(true)}>
          + Novo Cliente
        </button>
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
            reloadCustomerList={setUpdated}
            updated={updated}
            key={cust.id + cust.full_name}
            itemId={cust.id}
            fullName={cust.full_name}
            email={cust.email}
          />
        ))}
      </article>
    </main>
  );
};

export default Customer;
