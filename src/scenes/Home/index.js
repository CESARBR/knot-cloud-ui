import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import CardBoard from './components/CardBoard';
import DeviceCard from './components/DeviceCard';
import './styles.css';

const actions = ['Gateways', 'Apps', 'Sign Out'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      appsList: [],
      gatewaysList: [],
      redirect: false
    };
    this.updateCurrentScene = this.updateCurrentScene.bind(this);
    this.signout = this.signout.bind(this);
    this.addDevice = this.addDevice.bind(this);
  }

  componentWillMount() {
    // TODO: Create a state with a client knot-lib-websocket
  }

  componentDidMount() {
    // TODO: Connect the client to cloud and initialize the lists
  }

  componentWillUnmount() {
    // TODO: Close the client connection
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
