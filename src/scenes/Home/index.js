import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        this.setState({ gatewaysList: await cloud.devices({ type: 'gateway' }) });
        this.setState({ appsList: await cloud.devices({ type: 'app' }) });
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
    // TODO: make request `updateMetada` to cloud
    console.log(`device ${device.uuid} change property ${title} to ${content}`); // eslint-disable-line no-console
  }

  deleteOnCloud(uuid) {
    // TODO: make request `unregister` to cloud
    console.log(uuid); // eslint-disable-line no-console
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
