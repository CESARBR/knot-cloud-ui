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
      listGateways: [], // TODO: Initialize thoses lists with service getDevices
      listApps: [],
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
    const { currentScene, listGateways, listApps } = this.state;
    const list = currentScene === 'Gateways' ? listGateways : listApps;
    const device = list.find(dev => dev.uuid === uuid);
    device[title] = content;
    // TODO: request to service
    if (currentScene === 'Gateways') {
      this.setState({ listGateways: list });
    } else if (currentScene === 'Apps') {
      this.setState({ listApps: list });
    }
  }

  removeFromCloud(uuid) {
    const { currentScene, listGateways, listApps } = this.state;
    const list = currentScene === 'Gateways' ? listGateways : listApps;

    // TODO: request to service
    list.splice(list.findIndex(i => i.uuid === uuid), 1);
    if (currentScene === 'Gateways') {
      this.setState({ listGateways: list });
    } else if (currentScene === 'Apps') {
      this.setState({ listApps: list });
    }
  }

  addInCloud(device) {
    // TODO: request to service
    const { currentScene, listGateways, listApps } = this.state;
    const list = currentScene === 'Gateways' ? listGateways : listApps;
    list.push(device);
    if (currentScene === 'Gateways') {
      this.setState({ listGateways: list });
    } else if (currentScene === 'Apps') {
      this.setState({ listApps: list });
    }
  }

  addDevice() {
    // TODO: objModal comes from the modal callback
    const objModal = {
      name: 'Raspberry1',
      uuid: Math.floor(Math.random() * 10000),
      token: 'secret'
    };

    this.addInCloud(objModal);
  }

  showCardsInList(list) {
    const cardList = [];
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
      cardList.push(<Card
        header={header}
        onHeaderChange={(headerChange) => { this.updateInCloud(device.uuid, 'name', headerChange); }}
        body={body}
        onBodyChange={(title, content) => this.updateInCloud(device.uuid, title, content)}
        action={{ click: () => { this.removeFromCloud(device.uuid); }, icon: 'delete' }}
        key={`${device.uuid}`}
        id={`${device.uuid}`}
      />);
    });
    return cardList;
  }

  showRegisteredDevices() {
    const { currentScene, listGateways, listApps } = this.state;

    switch (currentScene) {
      case 'Gateways':
        return (
          <CardBoard>
            {this.showCardsInList(listGateways)}
          </CardBoard>);
      case 'Apps':
        return (
          <CardBoard>
            {this.showCardsInList(listApps)}
          </CardBoard>);
      default:
        return (
          <CardBoard>
            {this.showCardsInList(listGateways)}
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
