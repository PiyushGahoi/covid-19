import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest} render={(props) => { return (!isAuthenticated && !loading ? (<Redirect to="/" />) : (<Component {...props} />)); }} />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
