import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieInfo from '../pages/MovieInfo';

const Routes: React.FC = () => (
  <Switch>
    <Route path ='/' exact component={Home} />
    <Route path ='/movie/:id' exact component={MovieInfo} />
  </Switch>  
);

export default Routes;