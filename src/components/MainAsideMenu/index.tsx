import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

import ControlboardIconSidemenu from '../../assets/controlboard.svg';
import LawsuitIconSidemenu from '../../assets/lawsuit.svg';
import ClientsIconSidemenu from '../../assets/clients.svg';

const menu = [
  {
    id: 1,
    src: ControlboardIconSidemenu,
    alt: 'Icon do painel de controle',
    control: 'Painel de Controle',
    path: '/dashboard',
  },
  {
    id: 2,
    src: LawsuitIconSidemenu,
    alt: 'Icon dos processos',
    control: 'Processos',
    path: '/processos',
  },
  {
    id: 3,
    src: ClientsIconSidemenu,
    alt: 'Icon do cliente',
    control: 'Clientes',
    path: '/clientes',
  },
];

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: '600',
  fontSize: '14px',
};

const index = () => (
  <aside className="Side-Menu">
    <section className="Top-SideMenu">
      <span className="Logo-SideMenu">logo</span>
      {menu.map((eachElement) => (
        <NavLink
          to={eachElement.path}
          exact
          activeClassName="activeRoute"
          style={linkStyle}
          key={eachElement.id}
        >
          <nav className="Subject-SideMenu">
            <button type="button">
              <div className="Active-SideMenu" />
              <img className="Icon-SideMenu" src={eachElement.src} alt={eachElement.alt} />
              <span>{eachElement.control}</span>
            </button>
          </nav>
        </NavLink>
      ))}
    </section>
    <section className="Bottom-SideMenu">
      <span>
        Feito com ♥ por
        {' '}
        <span className="by"> u.dev_</span>
      </span>
    </section>
  </aside>
);
export default index;
