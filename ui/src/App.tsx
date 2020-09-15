import React from 'react';
import Home from './pages/Home/';
import SuccessInit from './pages/SuccessInit/';
import Calendar from './pages/Calendar';
import GlobalStyle from './common/globalStyles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <GlobalStyle />

      <Switch>
        <Route path="/calendar/:id">
          <Calendar />
        </Route>
        <Route path="/success/:id">
          <SuccessInit />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
