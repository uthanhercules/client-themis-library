import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { IFiveProcedures } from "../../types/componentsTypes";

const index = (props: IFiveProcedures) => {
  const { lawsuitNumber, customerName, lawsuitName, dateUpdated } = props;
  return (
    <section className="Lawsuit">
      <NavLink className="text-blue Number" to={`/processos/${lawsuitNumber}`}>
        {lawsuitNumber}
      </NavLink>
      <span className="text-white Client">{customerName}</span>
      <span className="text-white Lawsuit-Name">{lawsuitName}</span>
      <span className="text-white Last-Update">{dateUpdated}</span>
    </section>
  );
};

export default index;
