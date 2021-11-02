import React from 'react';
import { Switch, Route } from 'react-router-dom';

import singIn from './pages/singIn';
import singUp from './pages/singUp';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={singIn} />
    <Route path="/singUp" component={singUp} />
  </Switch>
);

export default Routes;
