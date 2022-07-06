import './procedureList.scss';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { IProcecdureList } from '../../types/componentType';
import { IProcedure } from '../../types/procedureTypes';

const ProcedureList = ({ lawsuitList }: IProcecdureList) => {
  return (
    <>
      <section className='lawsuit-header'>
        <span className='number'>número</span>
        <span className='client'>cliente</span>
        <span className='lawsuit-name'>nome do processo</span>
        <span className='last-update'>última alteração</span>
      </section>
      {lawsuitList.map((item: IProcedure) => {
        return (
          <section key={item.updated} className='lawsuit-list'>
            <Link
              as={NavLink}
              className='text-blue number'
              to={`/processos/${item.procedure_number}`}
            >
              {item.procedure_number}
            </Link>
            <span className='text-white client'>{item.customer_name}</span>
            <span className='text-white lawsuit-name'>{item.name}</span>
            <span className='text-white last-update'>{item.updated}</span>
          </section>
        );
      })}
    </>
  );
};

export default ProcedureList;
