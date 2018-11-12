import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import KLoginIcon from '_assets/png/KLoginIcon.png';
import { Signup, Signin } from 'scenes/AccessControl/Sign';
import Forgot from 'scenes/AccessControl/Forgot';
import Reset from 'scenes/AccessControl/Reset';
import ConditionalRoute from 'util/ConditionalRoute';
import 'scenes/AccessControl/styles.css';

class AccessControl extends Component {
  render() {
    return (
      <div className="access-control-wrapper">
        <div className="knot-logo-wrapper">
          <img className="knot-logo-image" src={KLoginIcon} alt="KNoT logo" />
          <div className="knot-logo-header">KNoT Cloud</div>
        </div>
        <Switch>
          <ConditionalRoute path="/signin" component={Signin} />
          <ConditionalRoute path="/forgot" component={Forgot} />
          <ConditionalRoute path="/signup" component={Signup} />
          <ConditionalRoute path="/reset" component={Reset} />
        </Switch>
      </div>
    );
  }
} export default AccessControl;
