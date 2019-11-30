import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'pages/home';
import DetailsPage from 'pages/detail';

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id/detail" component={DetailsPage} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
