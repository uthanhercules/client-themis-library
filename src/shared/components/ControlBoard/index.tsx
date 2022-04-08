import React from 'react';
import './style.scss';

interface IProps {
    src: string,
    alt: string,
    span: string,
    color: string
}

const index = (props: IProps) => {
  const {
    src, alt, span, color,
  } = props;
  return (
    <button type="button" className="Controller" style={{ backgroundColor: color }}>
      <img className="Icon-ControlBoard" src={src} alt={alt} />
      <span>{span}</span>
    </button>
  );
};

export default index;
