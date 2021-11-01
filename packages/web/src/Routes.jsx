import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login';

const Routes = () => (
  <Switch>
    <Route path="/" component={Login} />
  </Switch>
);

export default Routes;
