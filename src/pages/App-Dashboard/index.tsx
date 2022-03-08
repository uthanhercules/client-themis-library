import React from 'react';
import './style.scss';

import SideMenu from '../../components/SideMenu'
import Header from '../../components/Header'
import ControlBoard from '../../components/ControlBoard'
import LawsuitUpdates from '../../components/LawsuitUpdates'

import controlboard from '../../assets/controlboard.svg'
import lawsuit from '../../assets/lawsuit.svg'
import clients from '../../assets/clients.svg'

import newlawsuit from '../../assets/newlawsuit.svg'
import newclient from '../../assets/newclient.svg'
import editmydata from '../../assets/editmydata.svg'

function index() {
  const menu = [
    {
      id: 1,
      src: controlboard,
      alt: 'Icon do painel de controle',
      control: 'Painel de Controle'
    },
    {
      id: 2,
      src: lawsuit,
      alt: 'Icon dos processos',
      control: 'Processos'
    },
    {
      id: 3,
      src: clients,
      alt: 'Icon do cliente',
      control: 'Clients'
    }
  ]

  const board = [
    {
      id: 1,
      src: newlawsuit,
      alt: 'Icon para novo processo',
      span: 'Novo Processo',
      cor: '#2C99FF'
    },
    {
      id: 2,
      src: newclient,
      alt: 'Icon de novo cliente',
      span: 'Novo Cliente',
      cor: '#20C997'
    },
    {
      id: 3,
      src: editmydata,
      alt: 'Icon para edição de dados',
      span: 'Editar meus Dados',
      cor: '#FA8B0C'
    }
  ]

  const database = [
    {
      number: 12345678901234567890,
      name: 'Malu Costa',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '02 de Janeiro de 2022'
    },
    {
      number: 12345678901234567890,
      name: 'Aurora Carvalho',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '12 de Dezembro de 2021'
    },
    {
      number: 12345678901234567890,
      name: 'Caroline Dias',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '07 de Setembro de 2021'
    },
    {
      number: 12345678901234567890,
      name: 'Cauê Aragão',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '26 de Abril de 2021'
    },
    {
      number: 12345678901234567890,
      name: 'Alexia Mariana',
      lawsuit: 'Lorem ipsum porta commodo',
      lastupdate: '11 de Janeiro de 2021'
    },
  ]

  return (
    < main className="App-Dashboard" >
      <aside className="Side-Menu">
        <section className='top'>
          <span className='logo'>logo</span>

          {menu.map((eachElement) => (
            <SideMenu key={eachElement.id} src={eachElement.src} alt={eachElement.alt} control={eachElement.control} />
          ))}
        </section>

        <section className='bottom'>
          <span className='by'>Feito com ♥ por u.dev_</span>
        </section>
      </aside>

      <Header />

      <article className='Content'>
        <section>
          <h1>Painel de Controle</h1>

          <nav className='Controlboard'>
            {board.map((eachController) => (
              <ControlBoard key={eachController.id} src={eachController.src} alt={eachController.alt} span={eachController.span} cor={eachController.cor} />
            ))}
          </nav>
        </section>

        <section className='Lawsuit-Updates'>
          <h2>Últimos processos atualizados</h2>
          <article>
            <section className='Menu-Lawsuit'>
              <span>número</span>
              <span>cliente</span>
              <span>nome do processo</span>
              <span>última alteração</span>
            </section>

            <section className='Lawsuit-Data'>
              {database.map((eachData) => (
                <LawsuitUpdates number={eachData.number} name={eachData.name} lawsuit={eachData.lawsuit} lastupdate={eachData.lastupdate} />
              ))}
            </section>

          </article>
        </section>
      </article>

    </main >
  );

}

export default index;
