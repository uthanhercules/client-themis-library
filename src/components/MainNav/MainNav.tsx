import { NavLink } from 'react-router-dom';
import {
  Heading,
  Link,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<SettingsIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem>Meu Perfil</MenuItem>
              <MenuItem onClick={logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </nav>
      </section>
    </article>
  );
};

export default MainNav;
