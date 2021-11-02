import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import ManagerHome from './pages/Manager';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SingIn} />
    <Route path="/singUp" component={SingUp} />
    <Route path="/manager" component={ManagerHome} />
  </Switch>
);

export default Routes;
