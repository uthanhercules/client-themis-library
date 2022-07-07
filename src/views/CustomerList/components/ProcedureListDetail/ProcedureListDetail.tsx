import './procedureListDetail.scss';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { IProcecdureListDetail } from '../../../../types/componentType';
import { IProcedure } from '../../../../types/procedureTypes';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ProcedureListDetail = ({
  lawsuitList,
  deleteAction,
  editAction,
  action,
}: IProcecdureListDetail) => {
  return (
    <>
      <section className='lawsuit-header-detail'>
        <span className='number'>número</span>
        <span className='client'>cliente</span>
        <span className='lawsuit-name'>nome do processo</span>
        <span className='edit'></span>
        <span className='delete'></span>
      </section>
      {lawsuitList.map((item: IProcedure) => {
        return (
          <section
            key={item.updated}
            className='lawsuit-list-detail procedure-item'
          >
            <Link
              as={NavLink}
              className='text-blue number'
              to={`/processos/${item.procedure_number}`}
            >
              {item.procedure_number}
            </Link>
            <span className='text-white client'>{item.customer_name}</span>
            <span className='text-white lawsuit-name'>{item.name}</span>
            <button
              onClick={() => {
                action(item.procedure_number);
                editAction(true);
              }}
            >
              <EditIcon color='#FA8B0C' />
            </button>
            <button
              onClick={() => {
                action(item.procedure_number);
                deleteAction(true);
              }}
            >
              <DeleteIcon color='#FF4D4F' />
            </button>
          </section>
        );
      })}
    </>
  );
};

export default ProcedureListDetail;
