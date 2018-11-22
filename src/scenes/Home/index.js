import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddButton from './components/AddButton';
import CardBoard from './components/CardBoard';
import Card from './components/Card';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'Gateways',
      gatewaysList: [], // TODO: Initialize thoses lists with service getDevices
      appsList: [],
      redirect: false
    };
    this.updateCurrentScente = this.updateCurrentScente.bind(this);
    this.logout = this.logout.bind(this);
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

  updateInCloud(uuid, title, content) {
    const { currentScene, gatewaysList, appsList } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;
    const device = list.find(dev => dev.uuid === uuid);
    device[title] = content;
    // TODO: request to service
    if (currentScene === 'Gateways') {
      this.setState({ gatewaysList: list });
    } else if (currentScene === 'Apps') {
      this.setState({ appsList: list });
    }
  }

  removeFromCloud(uuid) {
    const { currentScene, gatewaysList, appsList } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;

    // TODO: request to service
    list.splice(list.findIndex(i => i.uuid === uuid), 1);
    if (currentScene === 'Gateways') {
      this.setState({ gatewaysList: list });
    } else if (currentScene === 'Apps') {
      this.setState({ appsList: list });
    }
  }

  addInCloud(objModal) {
    // TODO: request to service
    const device = {
      uuid: Math.floor(Math.random() * 10000),
      token: 'secret'
    };
    const { currentScene, gatewaysList, appsList } = this.state;
    const list = currentScene === 'Gateways' ? gatewaysList : appsList;

    Object.assign(device, objModal); // merge objects
    list.push(device);
    if (currentScene === 'Gateways') {
      this.setState({ gatewaysList: list });
    } else if (currentScene === 'Apps') {
      this.setState({ appsList: list });
    }
  }

  addDevice() {
    // TODO: objModal comes from the modal callback
    const objModal = {
      name: 'Raspberry1'
    };

    this.addInCloud(objModal);
  }

  showCards(list) {
    const cards = [];
    let body;
    let header;
    list.forEach((device) => {
      const fieldsToHide = ['uuid', 'token', 'name'];
      if (device.name) {
        header = device.name;
      }
      body = Object.keys(device).map(i => ({ title: i, content: `${device[i]}`, isHidden: false }));
      body.forEach((i) => { // Hide fields in body
        if (fieldsToHide.includes(i.title)) {
          i.isHidden = true;
        }
      });
      cards.push(<Card
        header={header}
        onHeaderChange={(headerChange) => { this.updateInCloud(device.uuid, 'name', headerChange); }}
        body={body}
        onBodyChange={(title, content) => this.updateInCloud(device.uuid, title, content)}
        action={{ click: () => { this.removeFromCloud(device.uuid); }, icon: 'delete' }}
        key={`${device.uuid}`}
        id={`${device.uuid}`}
      />);
    });
    return cards;
  }

  showRegisteredDevices() {
    const { currentScene, gatewaysList, appsList } = this.state;

    switch (currentScene) {
      case 'Apps':
        return (
          <CardBoard>
            {this.showCards(appsList)}
          </CardBoard>);
      case 'Gateways':
      default:
        return (
          <CardBoard>
            {this.showCards(gatewaysList)}
          </CardBoard>);
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
          onSceneChange={this.updateCurrentScente}
          onLogout={this.logout}
        />
        <AddButton id="add-device" onClick={this.addDevice} />
        {this.showRegisteredDevices()}
        {this.renderRedirect()}
      </div>
    );
  }
} export default Home;
