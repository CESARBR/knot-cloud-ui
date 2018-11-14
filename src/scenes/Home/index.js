import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      redirect: false
    };
    this.updateCurrentScente = this.updateCurrentScente.bind(this);
    this.logout = this.logout.bind(this);
  }

  updateCurrentScente(newScene) {
    this.setState({
      currentScene: newScene
    });
  }

  logout() { // eslint-disable-line class-methods-use-this
    // TODO:
    // Remove token from storage
    this.setState({
      redirect: true
    });
  }

  showRegisteredDevices() {
    const { currentScene } = this.state;

    switch (currentScene) {
      case 'Apps':
        return (<div> Apps </div>);
      case 'Gateways':
      default:
        return (<div> Gateways </div>);
    }
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/signin" />;
    }
  }

  render() {
    const { currentScene } = this.state;

    return (
      <div className="home-wrapper">
        <Navbar
          currentScene={currentScene}
          onSceneChange={this.updateCurrentScente}
          onLogout={this.logout}
        />
        {this.showRegisteredDevices()}
        {this.renderRedirect()}
      </div>
    );
  }
} export default Home;
