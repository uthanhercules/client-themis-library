import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/App-Login';
import PasswordRecovery from './pages/App-PasswordRecovery';
import Dashboard from './pages/App-Dashboard';
import MainAsideMenu from './components/MainAsideMenu';

function App() {
  // TODO - Filter routes to show the menu only for Auth Users
  return (
    <Router>
      <ToastContainer theme="dark" />
      <main className="App">
        <MainAsideMenu />
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
