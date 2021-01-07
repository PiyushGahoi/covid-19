import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Requests from '../pages/User/Requests';

class Body extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => { return <Home />; }} />
        <PrivateRoute exact path="/user/requests" component={Requests} />
      </Switch>
    );
  }
}

export default Body;
