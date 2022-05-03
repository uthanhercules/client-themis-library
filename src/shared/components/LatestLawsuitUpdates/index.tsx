import React from "react";
import "./style.scss";
import { IFiveProcedures } from "../../types/componentsTypes";

const index = (props: IFiveProcedures) => {
  const { lawsuitNumber, customerName, lawsuitName, dateUpdated } = props;
  return (
    <section className="Lawsuit">
      <span className="text-blue Number">{lawsuitNumber}</span>
      <span className="text-white Client">{customerName}</span>
      <span className="text-white Lawsuit-Name">{lawsuitName}</span>
      <span className="text-white Last-Update">{dateUpdated}</span>
    </section>
  );
};

export default index;
