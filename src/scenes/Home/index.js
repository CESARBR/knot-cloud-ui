import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    // TODO:
    // Remove token from storage
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
          actions={actions}
          onAction={(action) => {
            if (action === 'Sign Out') this.signout();
            else this.updateCurrentScene(action);
          }}
        />
        <AddButton onClick={this.addDevice} />
        {this.showCurrentScene()}
        {this.renderRedirect()}
      </div>
    );
  }
} export default Home;
