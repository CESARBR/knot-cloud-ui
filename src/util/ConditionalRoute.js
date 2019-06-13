import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Storage from 'services/Storage';

const ConditionalRoute = ({
  path, component: CustomComponent, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const isBlockedRoute = (path === '/signin' || path === '/signup' || path === '/forgot' || path === '/reset');
      if (isBlockedRoute && Storage.credentialsExists()) {
        return <Redirect to="/" />;
      }
      if (path === '/' && !Storage.credentialsExists()) {
        return <Redirect to="/signin" />;
      }

      return <CustomComponent {...props} />;
    }
} />
);

ConditionalRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export default ConditionalRoute;
