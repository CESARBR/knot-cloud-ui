import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Forgot from './components/Forgot';
import Signup from './components/Signup';
import Reset from './components/Reset';
import Signin from './components/Signin';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset" component={Reset} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
} export default App;
