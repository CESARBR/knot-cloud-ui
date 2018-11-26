import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from 'components/TextInput';
import Modal from 'components/Modal';
import PrimaryButton from 'components/Button/PrimaryButton';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      redirect: false,
      showModal: false
    };
    this.updateCurrentScente = this.updateCurrentScente.bind(this);
    this.logout = this.logout.bind(this);
    this.createModalContent = this.createModalContent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.addDevice = this.addDevice.bind(this);
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

  toggleModal() {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal
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

  addDevice() {
    const { newDeviceName } = this.state;
    // TODO:
    // Request to 'register' endpoint
    // Close modal on success and show ErrorMessage on error
    window.alert(`${newDeviceName} device added`); // eslint-disable-line no-alert
    this.toggleModal();
  }

  createModalContent() {
    const { currentScene } = this.state;
    const deviceType = currentScene === 'Gateways' ? 'Gateway' : 'App';
    const header = `New ${deviceType}`;

    return (
      <div className="text-modal">
        <h2>
          {header}
        </h2>
        <form onSubmit={this.addDevice}>
          <TextInput type="text" id="name" placeholder={`${deviceType} name`} onChange={e => this.setState({ newDeviceName: e.target.value })} />
          <PrimaryButton name="OK" />
        </form>
      </div>
    );
  }

  renderModal() {
    return (
      <Modal onCloseRequest={this.toggleModal}>
        <this.createModalContent />
      </Modal>
    );
  }

  renderRedirect() { // eslint-disable-line consistent-return
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/signin" />;
    }
  }

  render() {
    const { currentScene, showModal } = this.state;

    return (
      <div className="home-wrapper">
        <Navbar
          currentScene={currentScene}
          onSceneChange={this.updateCurrentScente}
          onLogout={this.logout}
        />
        <AddButton id="add-device" onClick={this.toggleModal} />
        {showModal && this.renderModal()}
        {this.showRegisteredDevices()}
        {this.renderRedirect()}
      </div>
    );
  }
} export default Home;
