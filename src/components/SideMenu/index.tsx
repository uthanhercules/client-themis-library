import React from 'react';
import './style.scss'

interface IProps {
  src: string,
  alt: string,
  control: string,
}

const index = (props: IProps) => {
  const { src, alt, control } = props
  return (
    <nav className='Subject-SideMenu'>
      <button>
        <div className='Active-SideMenu'></div>
        <img className='Icon-SideMenu' src={src} alt={alt} />
        <span>{control}</span>
      </button>
    </nav>
  );
};

export default index;
