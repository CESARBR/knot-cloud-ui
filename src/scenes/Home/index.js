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
  const port = window.location.protocol === 'https:' ? 443 : 80;
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
        gatewaysList: await cloud.getDevices({ type: 'knot:gateway' }),
        appsList: await cloud.getDevices({ type: 'knot:app' }),
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
    const device = message.payload ? message.payload : message;

    if (device.type === 'knot:gateway' && !this.existsInList(gatewaysList, device.knot.id)) {
      this.setState({ gatewaysList: [...gatewaysList, device] });
    } else if (device.type === 'knot:app' && !this.existsInList(appsList, device.knot.id)) {
      this.setState({ appsList: [...appsList, device] });
    }
  }

  onDeviceRemoved(message) {
    const { appsList, gatewaysList } = this.state;

    if (!message || !message.from) {
      return;
    }

    const deviceId = message.from;

    if (this.existsInList(appsList, deviceId)) {
      this.removeDeviceFromList(appsList, deviceId);
      this.setState({ appsList });
    } else if (this.existsInList(gatewaysList, deviceId)) {
      this.removeDeviceFromList(gatewaysList, deviceId);
      this.setState({ gatewaysList });
    }
  }

  updateCurrentScene(newScene) {
    this.setState({
      currentScene: newScene
    });
  }

  existsInList(list, deviceId) {
    return list.find(device => device.knot.id === deviceId);
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

  async addDevice(properties) {
    const {
      currentScene, cloud, gatewaysList, appsList
    } = this.state;
    this.setState({ errorMessage: '' });
    const type = currentScene === 'Gateways' ? 'knot:gateway' : 'knot:app';
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;
    const { name, isThingManager } = properties;

    try {
      const device = await cloud.register({ type, name, isThingManager });
      list.push(device);
      if (type === 'knot:gateway') {
        this.setState({ gatewaysList: list });
      } else if (type === 'knot:app') {
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
      await cloud.update(device.knot.id, metadata);
      console.log(`device ${device.knot.id} property ${key} updated to ${value}`); // eslint-disable-line no-console
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  async deleteOnCloud(id) {
    const {
      cloud, currentScene, gatewaysList, appsList
    } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;

    try {
      await cloud.unregister(id);
      this.removeDeviceFromList(list, id);
      if (currentScene === 'Gateways') {
        this.setState({ gatewaysList });
      } else if (currentScene === 'Apps') {
        this.setState({ appsList });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  removeDeviceFromList(list, deviceId) {
    return list.splice(list.findIndex(device => device.knot.id === deviceId), 1);
  }

  async createSessionTokenOnCloud(device) {
    const { cloud } = this.state;
    try {
      device.token = await cloud.createSessionToken(device.knot.id);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    return device;
  }

  showCards(list) {
    return list.map(device => (
      <DeviceCard
        key={device.knot.id}
        device={device}
        onPropertyChange={(property, content) => this.updateOnCloud(device, property, content)}
        onDelete={() => this.deleteOnCloud(device.knot.id)}
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
        />
        )}
        {!loading && this.showCurrentScene()}
        {loading && this.showSpinner()}
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Home;
