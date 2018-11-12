import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Storage from 'services/Storage';

const ConditionalRoute = ({
  path, component: CustomComponent, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if ((path === '/signin' || path === '/signup' || path === '/forgot' || path === '/reset') && Storage.credentialsExists()) {
        return <Redirect to="/" />;
      }
      if (path === '/' && !Storage.credentialsExists()) {
        return <Redirect to="/signin" />;
      }

      return <CustomComponent {...props} />;
    }
} />
);

export default ConditionalRoute;
