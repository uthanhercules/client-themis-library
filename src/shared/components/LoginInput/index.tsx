import React from 'react';
import './style.scss';
import { ILoginInput } from '../../types/componentsTypes';

const index = (props: ILoginInput) => {
  const { type, placeholder, action, value } = props;

  return (
    <input
      value={value}
      className='login-input'
      type={type}
      placeholder={placeholder}
      onChange={(e) => action(e.target.value)}
    />
  );
};

export default index;
