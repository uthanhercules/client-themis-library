//* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../services/allCustomerService";
import PopUpToDeleteCustomer from "../PopUpToDeleteOrNot";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import "./style.scss";

interface ICustomerListItem {
  key: string;
  fullName: string;
  email: string;
  customerList: any;
  setCustomerList: any;
}

const index = ({
  key,
  fullName,
  email,
  customerList,
  setCustomerList,
}: ICustomerListItem) => {
  const [popUp, setPopUp] = useState(false);

  async function handleDeleteCustomer() {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.error("Você precisa estar logado para fazer isso.");
      return (window.location.href = "/login");
    }

    try {
      const { data, ok } = await apiService.deleteCustomer(userToken);

      if (!ok) {
        toast.error(data);
        return (window.location.href = "/login");
      }

      const localCustomers = [...customerList];
      const customerDelete = localCustomers.findIndex(
        (customer) => customer.id === key
      );
      localCustomers.splice(customerDelete, 1);

      setCustomerList(localCustomers);
    } catch (error: any) {
      return toast.error(error);
    }
  }

  return (
    <section className="customers-item">
      <NavLink to={`/customers/${fullName}`}>{fullName}</NavLink>
      <span className="c-email">{email}</span>
      <button className="c-edit">
        <img src={editIcon} alt="Edit Button" />
      </button>
      <button
        className="c-delete"
        onClick={() => (popUp ? setPopUp(false) : setPopUp(true))}
      >
        <img src={deleteIcon} alt="Delete Button" />
      </button>
      {popUp && (
        <PopUpToDeleteCustomer
          setPopUp={setPopUp}
          handleDeleteCustomer={handleDeleteCustomer}
        />
      )}
    </section>
  );
};

export default index;
