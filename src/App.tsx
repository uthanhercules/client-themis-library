/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/App-Home';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path={['/', '/login']} exact component={Home} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
