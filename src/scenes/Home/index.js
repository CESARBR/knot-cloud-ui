import React, { Component } from 'react';
import CardBoard from 'scenes/Home/components/CardBoard';
import DeviceCard from 'scenes/Home/components/DeviceCard';
import Storage from 'services/Storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      appsList: [],
      gatewaysList: []
    };
  }

  componentWillMount() {
    const { uuid, token } = Storage.getCredentials();
    // TODO: Create a state with a client knot-lib-websocket
    this.setState({
      client: { uuid, token } // eslint-disable-line react/no-unused-state
    });
  }

  componentDidMount() {
    // TODO: Connect the client to cloud and initialize the lists
  }

  componentWillUnmount() {
    // TODO: Close the client connection
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
    console.log(device); // eslint-disable-line no-console
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
    return (
      <div>
        <h1>KNoT Cloud UI</h1>
        {this.showCurrentScene()}
      </div>
    );
  }
} export default Home;
