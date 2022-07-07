import { NavLink } from 'react-router-dom';
import { Heading, Link } from '@chakra-ui/react';
import LogoutIcon from '../../assets/logout.svg';

import { deleteToken } from '../../utils/localStorage';
import { verifyAuth } from '../../services/authService';

import './mainNav.scss';

const MainNav = () => {
  const logout = (): void => {
    deleteToken();
    verifyAuth();
  };

  return (
    <article className='main-menu'>
      <section className='content'>
        <Heading as='h1' size='md'>
          Nunes e Lisboa
        </Heading>
        <nav>
          <Link as={NavLink} to='/painel'>
            Painel
          </Link>
          <Link as={NavLink} to='/processos'>
            Processos
          </Link>
          <Link as={NavLink} to='/clientes'>
            Clientes
          </Link>
          <button type='button' className='logout' onClick={logout}>
            <img src={LogoutIcon} alt='Botão de Sair' />
            <span>Sair</span>
          </button>
        </nav>
      </section>
    </article>
  );
};

export default MainNav;
