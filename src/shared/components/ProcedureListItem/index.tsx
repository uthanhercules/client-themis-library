/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from '../../services/procedureServices';
import deleteIcon from '../../assets/delete-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import './style.scss';

interface IProcedureListItem {
  reloadProcedureList: boolean;
  setReloadProcedureList: any;
  procedureNumber: string;
  name: string;
  customer: string;
}

const index = ({
  reloadProcedureList,
  setReloadProcedureList,
  procedureNumber,
  name,
  customer,
}: IProcedureListItem) => {
  const [currentId, setCurrentId] = useState('');
  const [editProcedure, setEditProcedure] = useState(false);

  async function handleDeleteButton(id: string) {
    if (id !== currentId) {
      setCurrentId(id);
      return toast.warning('Clique mais uma vez para deletar permanentemente.');
    }

    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        toast.error('Você precisa estar logado para fazer isso.');
        return (window.location.href = '/login');
      }

      const { data, ok } = await apiService.deleteProcedure(
        userToken,
        currentId
      );

      if (!ok) return toast.error(data);
    } catch (err: any) {
      return toast.error(err);
    }

    setReloadProcedureList(!reloadProcedureList);
    return toast.success('Cliente apagado com sucesso!');
  }

  if (editProcedure)
    return <Navigate to={`/processos/editar/${procedureNumber}`} />;

  return (
    <section className='procedure-item'>
      <NavLink to={`/processos/${procedureNumber}`}>{procedureNumber}</NavLink>
      <span className='p-name'>{name}</span>
      <span className='c-name'>{customer}</span>
      <button className='p-edit' onClick={() => setEditProcedure(true)}>
        <img src={editIcon} alt='Edit Button' />
      </button>
      <button
        className='p-delete'
        onClick={() => handleDeleteButton(procedureNumber)}
      >
        <img src={deleteIcon} alt='Delete Button' />
      </button>
    </section>
  );
};

export default index;
