import { NavLink } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import "./style.scss";

interface ICustomerListItem {
    fullName: string;
    email: string;
  }
  
  const index = ({ fullName, email }: ICustomerListItem) => {
    return (
      <section className="customers-item">
        <NavLink to={`/customers/${fullName}`}>{fullName}</NavLink>
        <span className="c-email">{email}</span>
        <button className="c-edit">
          <img src={editIcon} alt="Edit Button" />
        </button>
        <button className="c-delete">
          <img src={deleteIcon} alt="Delete Button" />
        </button>
      </section>
    );
  };
  
  export default index;