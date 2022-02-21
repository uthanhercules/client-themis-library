import React from 'react';
import './style.scss';

import MainButton from '../../components/MainButton';

const { useState } = React;

const index = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main className="App-Home">
      <h1>Home is Working!</h1>
      <p>{counter}</p>
      <MainButton setCounter={setCounter} counter={counter} />
    </main>
  );
};

export default index;
