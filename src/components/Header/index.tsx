import React from 'react';
import './style.scss'

import GoingOutIcon from '../../assets/getout.svg'

const index = () => {
    return (
        <header className='Header'>
            <button className='GoingOut'>
                <img
                    src={GoingOutIcon}
                    alt="Icon representando a conta"
                />
                <span>Sair</span>
            </button>
        </header>
    );
};

export default index;