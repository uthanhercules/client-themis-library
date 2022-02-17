/* eslint-disable import/no-unresolved */
import React from 'react';
import './style.scss';

interface IProps {
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  counter: number
}

const index = (props: IProps) => {
  const { setCounter, counter } = props;
  return <button className="Main-Button" type="button" onClick={() => setCounter(counter + 1)}>Contar</button>;
};

export default index;
