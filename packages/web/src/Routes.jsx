import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import ManagerHome from './pages/Manager';
import StockistPage from './pages/Stockist';
import BakerPage from './pages/Baker';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SingIn} />
    <Route path="/singUp" component={SingUp} />
    <Route path="/manager" component={ManagerHome} />
    <Route path="/stockist" component={StockistPage} />
    <Route path="/baker" component={BakerPage} />
  </Switch>
);

export default Routes;
