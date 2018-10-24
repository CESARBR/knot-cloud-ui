import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import KLoginIcon from './_assets/png/KLoginIcon.png';
import Forgot from './components/Forgot';
import Signup from './components/Signup';
import Reset from './components/Reset';
import Signin from './components/Signin';
import NotFound from './components/NotFound';

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
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
} export default App;
