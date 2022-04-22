import React from "react";
import "./style.scss";
import { IFiveProcedures } from "../../types/componentsTypes";

const index = (props: IFiveProcedures) => {
  const { identificador, name, lawsuit, lastupdate } = props;
  return (
    <section className="Lawsuit">
      <span className="text-blue Number">{identificador}</span>
      <span className="text-white Client">{name}</span>
      <span className="text-white Lawsuit-Name">{lawsuit}</span>
      <span className="text-white Last-Update">{lastupdate}</span>
    </section>
  );
};

export default index;
