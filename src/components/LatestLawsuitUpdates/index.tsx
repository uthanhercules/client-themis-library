import React from 'react';
import './style.scss';

interface IProps {
    identificador: string,
    name: string,
    lawsuit: string,
    lastupdate: string
}

const index = (props: IProps) => {
  const {
    identificador, name, lawsuit, lastupdate,
  } = props;
  return (
    <section className="Lawsuit">
      <span className="text-blue Number">{identificador}</span>
      <span className="text-white Client">{name}</span>
      <span className="text-white Lawsuit-Name">{lawsuit}</span>
      <span className="text-white Last-Update">{lastupdate}</span>
    </section>
  );
};

export default index;
