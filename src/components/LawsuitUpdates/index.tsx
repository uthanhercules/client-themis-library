import React from 'react';
import './style.scss'

interface IProps {
    number: number,
    name: string,
    lawsuit: string,
    lastupdate: string
}

const index = (props: IProps) => {
    const { number, name, lawsuit, lastupdate } = props
    return (
        <section className='Lawsuit'>
            <span className='text-blue number'>{number}</span>
            <span className='text-white name'>{name}</span>
            <span className='text-white lawsuit'>{lawsuit}</span>
            <span className='text-white'>{lastupdate}</span>
        </section>
    );
};

export default index;