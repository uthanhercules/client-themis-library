/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../services/allCustomerService";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import "./style.scss";

interface ICustomerListItem {
  itemId: string;
  fullName: string;
  email: string;
  reloadCustomerList: any;
  updated: boolean;
}

const index = ({
  reloadCustomerList,
  updated,
  itemId,
  fullName,
  email,
}: ICustomerListItem) => {
  const [currentId, setCurrentId] = useState("");
  const [editCustomer, setEditCustomer] = useState(false);

  async function handleDeleteButton(id: string) {
    if (id !== currentId) {
      setCurrentId(id);
      return toast.warning("Clique mais uma vez para deletar permanentemente.");
    }

    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        toast.error("Você precisa estar logado para fazer isso.");
        return (window.location.href = "/login");
      }

      const { data, ok } = await apiService.deleteCustomer(
        currentId,
        userToken
      );
      if (!ok) {
        toast.error(data);
        return (window.location.href = "/login");
      }
    } catch (err: any) {
      return toast.error(err);
    }

    reloadCustomerList(!updated);
    return toast.success("Cliente apagado com sucesso!");
  }

  if (editCustomer) return <Navigate to={`/clientes/editar/${itemId}`} />;

  return (
    <section className="customer-item">
      <NavLink to={`/clientes/${itemId}`}>{fullName}</NavLink>
      <span className="c-email">{email}</span>
      <button className="c-edit" onClick={() => setEditCustomer(true)}>
        <img src={editIcon} alt="Edit Button" />
      </button>
      <button className="c-delete" onClick={() => handleDeleteButton(itemId)}>
        <img src={deleteIcon} alt="Delete Button" />
      </button>
    </section>
  );
};

export default index;
