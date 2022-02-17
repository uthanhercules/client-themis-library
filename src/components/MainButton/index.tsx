/* eslint-disable import/no-unresolved */
import React from 'react';
import './style.scss';

const index = (props: any) => {
  const { setCounter, counter } = props;
  return (<button type="button" onClick={() => setCounter(counter + 1)}>Contar</button>);
};

export default index;
