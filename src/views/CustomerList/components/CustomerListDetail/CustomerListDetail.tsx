import './customerListDetail.scss';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ICustomer } from '../../../../types/customerTypes';
import { ICustomerListDetail } from '../../../../types/componentType';

const CustomerListDetail = ({
  customerList,
  deleteAction,
  editAction,
  action,
}: ICustomerListDetail) => {
  return (
    <>
      <section className='customer-header-detail'>
        <span className='fullname'>nome completo</span>
        <span className='email'>e-mail</span>
        <span className='edit'></span>
        <span className='delete'></span>
      </section>
      {customerList.map((item: ICustomer) => {
        return (
          <section key={item.id} className='customer-list-detail customer-item'>
            <Link
              as={NavLink}
              className='text-blue fullname'
              to={`/clientes/${item.id}`}
            >
              {item.full_name}
            </Link>
            <span className='text-white email'>{item.email}</span>
            <button
              className='edit'
              onClick={() => {
                action(item.id);
                editAction(true);
              }}
            >
              <EditIcon color='#FA8B0C' />
            </button>
            <button
              className='delete'
              onClick={() => {
                console.log(item.id);
                action(item.id);
                deleteAction(item.id);
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

export default CustomerListDetail;
