import React from 'react';
import './style.scss';

import GoingOutIcon from '../../assets/getout.svg';

const index = () => {
  function logOut() {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  }

  return (
    <header className='Header'>
      <button type='button' className='GoingOut' onClick={() => logOut()}>
        <img src={GoingOutIcon} alt='Icon representando a conta' />
        <span>Sair</span>
      </button>
    </header>
  );
};

export default index;
