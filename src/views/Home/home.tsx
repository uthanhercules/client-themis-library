import { Heading } from '@chakra-ui/react';
import { verifyAuth } from '../../services/authService';

import './home.scss';

function Home() {
  verifyAuth();
  return (
    <article className='home'>
      <section className='content'>
        <Heading as='h1'>Painel de Controle</Heading>
      </section>
    </article>
  );
}

export default Home;
