import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Storage from 'services/Storage';
import Cloud from './services/Cloud';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import CardBoard from './components/CardBoard';
import DeviceCard from './components/DeviceCard';
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
      loading: true,
      redirect: false
    };
    this.updateCurrentScene = this.updateCurrentScene.bind(this);
    this.signout = this.signout.bind(this);
    this.addDevice = this.addDevice.bind(this);
  }

  componentDidMount() {
    const { cloud } = this.state;

    cloud.connect()
      .then(async () => {
        this.setState({ gatewaysList: await cloud.getDevices({ type: 'gateway' }) });
        this.setState({ appsList: await cloud.getDevices({ type: 'app' }) });
        this.setState({ loading: false });
      })
      .catch((err) => {
        if (err) {
        // TODO: Show message to user when something went wrong
          console.error(err); // eslint-disable-line no-console
        }
      });
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

  addDevice(e) {
    const {
      currentScene, cloud, gatewaysList, appsList
    } = this.state;
    const type = currentScene === 'Gateways' ? 'gateway' : 'app';
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;
    const name = 'Default Name';
    e.persist();
    e.target.disabled = true;

    cloud.register({ type, name })
      .then((device) => {
        list.push(device);
        if (type === 'gateway') {
          this.setState({ gatewaysList: list });
        } else if (type === 'app') {
          this.setState({ appsList: list });
        }
        e.target.disabled = false;
      });
  }

  updateOnCloud(device, title, content) {
    const { cloud } = this.state;
    const metadata = { [title]: content };

    cloud.update(device.uuid, metadata)
      .then(() => {
        console.log(`device ${device.uuid} property ${title} updated to ${content}`); // eslint-disable-line no-console
      })
      .catch((err) => {
        if (err) {
          // TODO: Show message to user saying that the request failed
          console.error(err); // eslint-disable-line no-console
        }
      });
  }

  deleteOnCloud(uuid) {
    const {
      cloud, currentScene, gatewaysList, appsList
    } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;

    cloud.unregister(uuid)
      .then(() => {
        list.splice(list.findIndex(device => device.uuid === uuid), 1);
        if (currentScene === 'Gateways') {
          this.setState({ gatewaysList });
        } else if (currentScene === 'Apps') {
          this.setState({ appsList });
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err); // eslint-disable-line no-console
        }
      });
  }

  createSessionTokenOnCloud(device) {
    // TODO: make request `createSessionToken` to cloud
    device.token = 'new token';
    return device; // This return is required as a device where should have the new session token
  }

  showCards(list) {
    return list.map(device => (
      <DeviceCard
        key={device.uuid}
        device={device}
        onPropertyChange={(title, content) => this.updateOnCloud(device, title, content)}
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
        <span className="loading">Fetching for devices...</span>
      </div>
    );
  }

  render() {
    const { currentScene, redirect, loading } = this.state;

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
        {!loading && this.showCurrentScene()}
        {loading && this.showSpinner()}
        {redirect && <Redirect to="/signin" />}
      </div>
    );
  }
} export default Home;
