import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import KLoginIcon from '_assets/png/KLoginIcon.png';
import { Signup, Signin } from 'scenes/Sign';
import NotFound from 'scenes/NotFound';
import Forgot from 'scenes/Forgot';
import Reset from 'scenes/Reset';
import Gateway from 'scenes/Gateways';
import 'App.css';

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
            <Route path="/gateway" component={Gateway} />
            <Route path="/dev" component={Gateway} />
            <Route path="/admin" component={Gateway} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
} export default App;
