import React from 'react';
import './style.scss';

const index = (props: any) => {
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
