import { NavLink } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import "./style.scss";

interface IProcedureListItem {
  procedureNumber: string;
  name: string;
  customer: string;
}

const index = ({ procedureNumber, name, customer }: IProcedureListItem) => {
  return (
    <section className="procedure-item">
      <NavLink to={`/processos/${procedureNumber}`}>{procedureNumber}</NavLink>
      <span className="p-name">{name}</span>
      <span className="c-name">{customer}</span>
      <button className="p-edit">
        <img src={editIcon} />
      </button>
      <button className="p-delete">
        <img src={deleteIcon} />
      </button>
    </section>
  );
};

export default index;
