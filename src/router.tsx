import React from 'react';
import { IProtectedRoutes } from './types/routeTypes';
import {
  BrowserRouter,
  Routes,
  Outlet,
  Route,
  Navigate,
} from 'react-router-dom';

import MainNav from './components/MainNav/MainNav';

import Login from './views/Login/Login';
import NewPassword from './views/NewPassword/NewPassword';
import Home from './views/Home/home';
import ProcedureList from './views/ProcedureList/ProcedureList';
import CustomerList from './views/CustomerList/CustomerList';
import { getToken } from './utils/localStorage';

const ProtectedRoutes = ({ routePath }: IProtectedRoutes) => {
  const isAuth: string | null = getToken();
  return isAuth ? <Outlet /> : <Navigate to={routePath} />;
};

const RouterOutlet = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route element={<Login />}>
          <Route element={<Login />} path='/' />
          <Route element={<Login />} path='/login' />
        </Route>

        <Route element={<NewPassword />} path='/redefinir-senha' />

        <Route element={<ProtectedRoutes routePath='/login' />}>
          <Route element={<Home />} path='/painel' />
          <Route element={<ProcedureList />} path='/processos' />
          <Route element={<CustomerList />} path='/clientes' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterOutlet;
