import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from 'scenes/NotFound';
import AccessControl from 'scenes/AccessControl';
import Home from 'scenes/Home';
import 'App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/(signin|signup|forgot|reset)" component={AccessControl} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
} export default App;
