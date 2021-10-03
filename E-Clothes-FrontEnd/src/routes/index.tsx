import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/shopping" exact component={Home} />
      <Route path="/shopping/cart" exact component={Cart} />
    </Switch>
  );
};

export default Routes;
