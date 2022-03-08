import React from 'react';
import './style.scss'

interface IProps {
    src: string,
    alt: string,
    span: string,
    cor: string
}

const index = (props: IProps) => {
    const { src, alt, span, cor } = props
    return (
        <button className='controller' style={{ backgroundColor: cor }}>
            <img src={src} alt={alt} />
            <span>{span}</span>
        </button>
    );
};

export default index;