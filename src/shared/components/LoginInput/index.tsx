import React from "react";
import "./style.scss";
import { ILoginInput } from "../../types/componentsTypes";

const index = (props: ILoginInput) => {
  const { type, placeholder, action } = props;

  return (
    <input
      className="login-input"
      type={type}
      placeholder={placeholder}
      onChange={(e) => action(e.target.value)}
    />
  );
};

export default index;
