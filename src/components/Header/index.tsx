import React from 'react';
import './style.scss'

import nightmode from '../../assets/nightmode.svg'
import getout from '../../assets/getout.svg'

const index = () => {
    return (
        <header className='Header'>
            <button className='night'>
                <img src={nightmode} alt="Icon da lua representando o modo noturno da página" />
            </button>
            <button className='getout'>
                <img src={getout} alt="Icon pessoa representando a conta" />
                <span>Sair</span>
            </button>
        </header>
    );
};

export default index;