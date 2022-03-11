import React from 'react';
import './style.scss';

import SideMenu from '../../components/SideMenu'
import Header from '../../components/Header'
import ControlBoard from '../../components/ControlBoard'
import LatestLawsuitUpdates from '../../components/LatestLawsuitUpdates'

import ControlboardIconSidemenu from '../../assets/controlboard.svg'
import LawsuitIconSidemenu from '../../assets/lawsuit.svg'
import ClientsIconSidemenu from '../../assets/clients.svg'

import NewLawsuitIconControlBoard from '../../assets/newlawsuit.svg'
import NewNlientIconControlBoard from '../../assets/newclient.svg'
import EditMyDataIconControlBoard from '../../assets/editmydata.svg'

function index() {
  const menu = [
    {
      id: 1,
      src: ControlboardIconSidemenu,
      alt: 'Icon do painel de controle',
      control: 'Painel de Controle',
    },
    {
      id: 2,
      src: LawsuitIconSidemenu,
      alt: 'Icon dos processos',
      control: 'Processos',
    },
    {
      id: 3,
      src: ClientsIconSidemenu,
      alt: 'Icon do cliente',
      control: 'Clientes',
    }
  ]

  const board = [
    {
      id: 1,
      src: NewLawsuitIconControlBoard,
      alt: 'Icon para novo processo',
      span: 'Novo Processo',
      color: '#2C99FF',
    },
    {
      id: 2,
      src: NewNlientIconControlBoard,
      alt: 'Icon de novo cliente',
      span: 'Novo Cliente',
      color: '#20C997',
    },
    {
      id: 3,
      src: EditMyDataIconControlBoard,
      alt: 'Icon para edição de dados',
      span: 'Editar meus Dados',
      color: '#FA8B0C',
    }
  ]

  const database = [
    {
      identificador: '12345678901234567890',
      name: 'Malu Costa',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '02 de Janeiro de 2022',
    },
    {
      identificador: '12345678901234567890',
      name: 'Aurora Carvalho',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '12 de Dezembro de 2021',
    },
    {
      identificador: '12345678901234567890',
      name: 'Caroline Dias',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '07 de Setembro de 2021',
    },
    {
      identificador: '12345678901234567890',
      name: 'Cauê Aragão',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '26 de Abril de 2021',
    },
    {
      identificador: '12345678901234567890',
      name: 'Alexia Mariana',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '11 de Janeiro de 2021',
    },
  ]

  return (
    <main className="App-Dashboard">
      <aside className="Side-Menu">
        <section className='Top-SideMenu'>
          <span className='Logo-SideMenu'>logo</span>
          {menu.map((eachElement) => (
            <SideMenu
              key={eachElement.id}
              src={eachElement.src}
              alt={eachElement.alt}
              control={eachElement.control} />
          ))}
        </section>
        <section className='Bottom-SideMenu'>
          <span>Feito com ♥ por <a className='by'> u.dev_</a></span>
        </section>
      </aside>
      {/** */}
      <article className='Container-Content'>
        <Header />
        <section className='Controlboard'>
          <h1>Painel de Controle</h1>
          <nav className='Each-Controlboard'>
            {board.map((eachController) => (
              <ControlBoard
                key={eachController.id}
                src={eachController.src}
                alt={eachController.alt}
                span={eachController.span}
                color={eachController.color} />
            ))}
          </nav>
        </section>
        {/** */}
        <section className='Latest-Lawsuit-Updates'>
          <h2>Últimos processos atualizados</h2>
          <article>
            <section className='Menu-Lawsuit'>
              <span className='Number'>número</span>
              <span className='Client'>cliente</span>
              <span className='Lawsuit-Name'>nome do processo</span>
              <span className='Last-Update'>última alteração</span>
            </section>
            <section className='Lawsuit-Data'>
              {database.map((eachData) => (
                <LatestLawsuitUpdates
                  identificador={eachData.identificador}
                  name={eachData.name}
                  lawsuit={eachData.lawsuit}
                  lastupdate={eachData.lastupdate} />
              ))}
            </section>
          </article>
        </section>
      </article>
    </main >
  );

}

export default index;
