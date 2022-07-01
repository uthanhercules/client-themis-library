import React from 'react';
import { Routes, Outlet, Route, Navigate } from 'react-router-dom';

import Login from '../pages/login';
import PasswordRecovery from '../pages/passwordRecovery';
import Dashboard from '../pages/dashboard';
import Procedures from '../pages/procedures';
import NewProcedure from '../pages/newProcedure';
import Customers from '../pages/customers';
import NewCustomer from '../pages/newCustomer';
import EditCustomer from '../pages/editCustomer';
import EditProcedure from '../pages/editProcedure';
import CustomerDetails from '../pages/customerDetails';

function ProtectedRoutes({ redirectTo }: { redirectTo: string }) {
  const isAuth = localStorage.getItem('userToken');
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

const outlet = () => (
  <Routes>
    <Route element={<Login />}>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
    </Route>

    <Route path='/recuperar-senha' element={<PasswordRecovery />} />

    <Route element={<ProtectedRoutes redirectTo='/login' />}>
      <Route path='/painel' element={<Dashboard />} />
      <Route path='/processos/editar/:id' element={<EditProcedure />} />
      <Route path='/processos/novo' element={<NewProcedure />} />
      <Route path='/processos' element={<Procedures />} />
      <Route path='/clientes/editar/:id' element={<EditCustomer />} />
      <Route path='/clientes/novo' element={<NewCustomer />} />
      <Route path='/clientes' element={<Customers />} />
      <Route path='/clientes/:id' element={<CustomerDetails />} />
    </Route>
  </Routes>
);

export default outlet;
