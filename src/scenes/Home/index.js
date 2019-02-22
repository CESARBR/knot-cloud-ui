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

function createCloudService(credentials) {
  const { uuid, token } = credentials;
  const { hostname } = window.location;
  const port = window.location.protocol === 'https' ? 443 : 80;
  return new Cloud(hostname, port, uuid, token);
}

class Home extends Component {
  constructor(props) {
    super(props);
    const credentials = Storage.getCredentials();
    const cloud = createCloudService(credentials);
    cloud.on('registered', message => this.onDeviceRegistered(message));
    cloud.on('unregistered', message => this.onDeviceRemoved(message));
    this.state = {
      cloud,
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

  onDeviceRegistered(message) {
    const { appsList, gatewaysList } = this.state;
    const { device } = message.payload;

    if (device.type === 'gateway') {
      this.setState({ gatewaysList: [...gatewaysList, device] });
    } else if (device.type === 'app') {
      this.setState({ appsList: [...appsList, device] });
    }
  }

  onDeviceRemoved(message) {
    const { appsList, gatewaysList } = this.state;
    const deviceUuid = message.from;

    if (this.existsInList(appsList, deviceUuid)) {
      this.removeDeviceFromList(appsList, deviceUuid);
      this.setState({ appsList });
    } else if (this.existsInList(gatewaysList, deviceUuid)) {
      this.removeDeviceFromList(gatewaysList, deviceUuid);
      this.setState({ gatewaysList });
    }
  }

  updateCurrentScene(newScene) {
    this.setState({
      currentScene: newScene
    });
  }

  existsInList(list, deviceUuid) {
    return list.find(device => device.uuid === deviceUuid);
  }

  async signout() {
    const { cloud } = this.state;
    const credentials = Storage.getCredentials();

    try {
      await cloud.revokeSessionToken(credentials.uuid, credentials.token);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }

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
      this.removeDeviceFromList(list, uuid);
      if (currentScene === 'Gateways') {
        this.setState({ gatewaysList });
      } else if (currentScene === 'Apps') {
        this.setState({ appsList });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  removeDeviceFromList(list, deviceUuid) {
    return list.splice(list.findIndex(device => device.uuid === deviceUuid), 1);
  }

  async createSessionTokenOnCloud(device) {
    const { cloud } = this.state;
    try {
      device.token = await cloud.createSessionToken(device.uuid);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    return device;
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
            if (action === 'Sign Out') {
              if (window.confirm('Are you sure you wish to sign out?')) { // eslint-disable-line no-alert
                this.signout();
              }
            } else {
              this.updateCurrentScene(action);
            }
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
