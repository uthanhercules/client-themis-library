import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/App-Login';
import Dashboard from './pages/App-Dashboard';

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path={['/', '/login']} exact component={Login} />
          <Route path={['/dashboard']} component={Dashboard} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
