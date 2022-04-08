import React from 'react';
import {
  Routes, Outlet, Route, Navigate,
} from 'react-router-dom';

import Login from '../pages/App-Login';
import PasswordRecovery from '../pages/App-PasswordRecovery';
import Dashboard from '../pages/App-Dashboard';

function ProtectedRoutes({ redirectTo }: { redirectTo: string }) {
  const isAuth = localStorage.getItem('userToken');
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

const outlet = () => (
  <Routes>
    <Route element={<Login />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Route>

    <Route path="/recuperar-senha" element={<PasswordRecovery />} />

    <Route element={<ProtectedRoutes redirectTo="/login" />}>
      <Route path="/painel" element={<Dashboard />} />
    </Route>
  </Routes>
);

export default outlet;
