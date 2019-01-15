import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Storage from 'services/Storage';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import Modal from './components/Modal';
import './styles.css';

const actions = ['Gateways', 'Apps', 'Sign Out'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      redirect: false,
      showModal: false
    };
    this.updateCurrentScene = this.updateCurrentScene.bind(this);
    this.signout = this.signout.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    });
  }

  addDevice(newDeviceName) {
    // TODO:
    // Request to 'register' endpoint
    // Close modal on success and show ErrorMessage on error

    window.alert(`${newDeviceName} added`); // eslint-disable-line no-alert
    this.toggleModal();
  }

  render() {
    const { currentScene, redirect, showModal } = this.state;

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
        <AddButton onClick={this.toggleModal} />
        {showModal
        && (
        <Modal
          currentScene={currentScene}
          onCloseRequest={this.toggleModal}
          onSaveDevice={this.addDevice}
        />)}
        {this.showCurrentScene()}
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Home;
