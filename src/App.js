import React, { Component } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import KLoginIcon from '_assets/png/KLoginIcon.png';
import { Signup, Signin } from 'scenes/Sign';
import NotFound from 'scenes/NotFound';
import Forgot from 'scenes/Forgot';
import Reset from 'scenes/Reset';
import Gateway from 'scenes/Gateways';
import Storage from 'services/Storage';
import 'App.css';

const PrivateRoute = ({
  CustomComponent, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      Storage.getToken() ? <CustomComponent {...props} /> : <Redirect to="/login" />
    )
} />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="knot-logo-wrapper">
          <img className="knot-logo-image" src={KLoginIcon} alt="KNoT logo" />
          <div className="knot-logo-header">KNoT Cloud</div>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/signup" component={Signup} />
            <Route path="/reset" component={Reset} />
            <PrivateRoute path="/gateway" component={Gateway} />
            <PrivateRoute path="/dev" component={Gateway} />
            <PrivateRoute path="/admin" component={Gateway} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
} export default App;
