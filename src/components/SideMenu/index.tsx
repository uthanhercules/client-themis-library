import React from 'react';
import './style.scss'

interface IProps {
  src: string,
  alt: string,
  control: string
}

const index = (props: IProps) => {
  const { src, alt, control } = props
  return (
    <nav>
      <button>
        <div className='active'></div>
        <img src={src} alt={alt} />
        <span>{control}</span>
      </button>
    </nav>
  );
};

export default index;
