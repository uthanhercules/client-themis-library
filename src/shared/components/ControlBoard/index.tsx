import React from 'react';
import './style.scss';
import { IControlBoard } from '../../types/componentsTypes';

const index = (props: IControlBoard) => {
  const { src, alt, span, color } = props;
  return (
    <button
      type='button'
      className='Controller'
      style={{ backgroundColor: color }}
    >
      <img className='Icon-ControlBoard' src={src} alt={alt} />
      <span>{span}</span>
    </button>
  );
};

export default index;
