import React, { useEffect, useState } from 'react';

import './App.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import apiService from './services/apiService';

import Login from './pages/App-Login';
import PasswordRecovery from './pages/App-PasswordRecovery';
import Dashboard from './pages/App-Dashboard';
import MainAsideMenu from './components/MainAsideMenu';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return;
    }

    apiService.verifyLogin('/admin/auth-verify', userToken)
      .then((response) => {
        if (!response.ok) return;
        setAuth(response.ok);
      });
  }, []);

  return (
    <Router>
      <ToastContainer theme="dark" />
      <main className="App">
        {auth ? <MainAsideMenu /> : null}
        <Switch>
          <Route path={['/', '/login']} exact component={Login} />
          <Route path="/recuperar-senha" component={PasswordRecovery} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
