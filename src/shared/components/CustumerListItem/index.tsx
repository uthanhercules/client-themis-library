import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../services/allCustomerService"
import PopUpToDeleteCustomer from "../PopUpToDeleteOrNot";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import "./style.scss";

interface ICustomerListItem {
  key: string;
  fullName: string;
  email: string;
  customerList: object;
  setCustomerList: object;
}

interface IDeleteCustomer {
  key: string;
  customerList: object;
  setCustomerList: object;
}
  
const index = ({ key, fullName, email, customerList, setCustomerList }: ICustomerListItem) => {

  const [popUp, setPopUp] = useState(false);

  async function handleDeleteCustomer ({ key, customerList, setCustomerList }: IDeleteCustomer) {
    const userToken = localStorage.getItem("userToken");
    try {
      const { data, ok } = await apiService.deleteCustomer("userToken");

      const localCustomers = [...customerList];
      const customerDelete = localCustomers.findIndex((customer) => customer.id === key);
      localCustomers.splice(customerDelete, 1);

      setCustomerList(localCustomers);
    }catch(error) {
      return toast.error();
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
      onClick={() => popUp ? setPopUp(false) : setPopUp(true)}>
        <img src={deleteIcon} alt="Delete Button" />
      </button>
      { popUp &&
      <PopUpToDeleteCustomer
      setPopUp={setPopUp}
      handleDeleteCustomer={handleDeleteCustomer}
      />
      }
    </section>
  );
};
  
  export default index;