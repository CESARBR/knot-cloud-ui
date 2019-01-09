import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Storage from 'services/Storage';
import ErrorMessage from 'components/ErrorMessage';
import Cloud from './services/Cloud';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import CardBoard from './components/CardBoard';
import DeviceCard from './components/DeviceCard';
import Modal from './components/Modal';
import './styles.css';

const actions = ['Gateways', 'Apps', 'Sign Out'];
const { uuid: userUuid, token: userToken } = Storage.getCredentials();
const wsHostname = process.env.WS_HOSTNAME || 'localhost';
const wsPort = process.env.WS_PORT || 3004;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cloud: new Cloud(wsHostname, wsPort, userUuid, userToken),
      currentScene: 'Gateways',
      appsList: [],
      gatewaysList: [],
      errorMessage: '',
      redirect: false,
      showModal: false,
      loading: true
    };
    this.updateCurrentScene = this.updateCurrentScene.bind(this);
    this.signout = this.signout.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentDidMount() {
    const { cloud } = this.state;

    try {
      await cloud.connect();
      this.setState({
        gatewaysList: await cloud.getDevices({ type: 'gateway' }),
        appsList: await cloud.getDevices({ type: 'app' }),
        loading: false
      });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
        loading: false
      });
    }
  }

  componentWillUnmount() {
    const { cloud } = this.state;
    cloud.close();
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

  async addDevice(newDeviceName) {
    const {
      currentScene, cloud, gatewaysList, appsList
    } = this.state;
    this.setState({ errorMessage: '' });
    const type = currentScene === 'Gateways' ? 'gateway' : 'app';
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;
    const name = newDeviceName;

    try {
      const device = await cloud.register({ type, name });
      list.push(device);
      if (type === 'gateway') {
        this.setState({ gatewaysList: list });
      } else if (type === 'app') {
        this.setState({ appsList: list });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.toggleModal();
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    });
  }

  async updateOnCloud(device, key, value) {
    const { cloud } = this.state;
    const metadata = { [key]: value };

    try {
      await cloud.update(device.uuid, metadata);
      console.log(`device ${device.uuid} property ${key} updated to ${value}`); // eslint-disable-line no-console
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  async deleteOnCloud(uuid) {
    const {
      cloud, currentScene, gatewaysList, appsList
    } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;

    try {
      await cloud.unregister(uuid);
      list.splice(list.findIndex(device => device.uuid === uuid), 1);
      if (currentScene === 'Gateways') {
        this.setState({ gatewaysList });
      } else if (currentScene === 'Apps') {
        this.setState({ appsList });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  async createSessionTokenOnCloud(device) {
    // TODO: make request `createSessionToken` to cloud
    device.token = 'new token';
    return device; // This return is required as a device where should have the new session token
  }

  showCards(list) {
    return list.map(device => (
      <DeviceCard
        key={device.uuid}
        device={device}
        onPropertyChange={(property, content) => this.updateOnCloud(device, property, content)}
        onDelete={() => this.deleteOnCloud(device.uuid)}
        onDownload={() => this.createSessionTokenOnCloud(device)}
      />
    ));
  }

  showCurrentScene() {
    const { currentScene, gatewaysList, appsList } = this.state;

    switch (currentScene) {
      case 'Apps':
        return (<CardBoard>{this.showCards(appsList)}</CardBoard>);
      case 'Gateways':
      default:
        return (<CardBoard>{this.showCards(gatewaysList)}</CardBoard>);
    }
  }

  showSpinner() {
    return (
      <div>
        <Loader type="Oval" color="white" />
        <span className="loading">Fetching devices...</span>
      </div>
    );
  }

  render() {
    const {
      currentScene, redirect, showModal, errorMessage, loading
    } = this.state;

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
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <AddButton onClick={this.toggleModal} />
        {showModal
        && (
        <Modal
          currentScene={currentScene}
          onCloseRequest={this.toggleModal}
          onSaveDevice={this.addDevice}
        />)}
        {!loading && this.showCurrentScene()}
        {loading && this.showSpinner()}
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Home;
