import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Storage from 'services/Storage';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import './styles.css';

const actions = ['Gateways', 'Apps', 'Sign Out'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      redirect: false
    };
    this.updateCurrentScene = this.updateCurrentScene.bind(this);
    this.signout = this.signout.bind(this);
    this.addDevice = this.addDevice.bind(this);
  }

  updateCurrentScene(newScene) {
    this.setState({
      currentScene: newScene
    });
  }

  signout() {
    Storage.removeCredentials();

    this.setState({
      redirect: true
    });
  }

  addDevice() {
    const { currentScene } = this.state;

    window.alert(`Add new device on ${currentScene}`); // eslint-disable-line no-alert
  }

  showCurrentScene() {
    const { currentScene } = this.state;

    switch (currentScene) {
      case 'Apps':
        return (<div> Apps </div>);
      case 'Gateways':
      default:
        return (<div> Gateways </div>);
    }
  }

  render() {
    const { currentScene, redirect } = this.state;

    return (
      <div className="home-wrapper">
        <Navbar
          currentScene={currentScene}
          actions={actions}
          onAction={(action) => {
            if (action === 'Sign Out') this.signout();
            else this.updateCurrentScene(action);
          }}
        />
        <AddButton onClick={this.addDevice} />
        {this.showCurrentScene()}
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Home;
