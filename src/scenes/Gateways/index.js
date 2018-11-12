import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import KHeadIcon from '_assets/png/KHeadIcon.png';
import AddIcon from '_assets/svg/AddIcon.svg';
import Cardboard from 'scenes/Gateways/components/CardBoard';
import Card from 'scenes/Gateways/components/Card';
import './styles.css';

class Gateway extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <ul className="navbar">
            <li><img className="knot-logo-navbar" src={KHeadIcon} alt="KNoT logo" /></li>
            <li><div className="knot-cloud-navbar">KNoT Cloud</div></li>
            <div className="link-navbar">
              <li><NavLink to="/gateway">Gateways</NavLink></li>
              <li><NavLink to="/dev">Devices</NavLink></li>
              <li><NavLink to="/admin">Administration</NavLink></li>
              <li><Link to="/">Sign out</Link></li>
            </div>
          </ul>
        </div>
        <div className="my-gateways">
          <p>My Gateways/Apps</p>
          <br />
        </div>
        <Cardboard>
          <Card name="Gateway1" uuid="111" token="111" />
          <Card name="App1" uuid="222" token="222" />
          <Card name="Gateway2" uuid="333" token="333" />
          <Card name="App2" uuid="444" token="444" />
        </Cardboard>
      </div>
    );
  }
}

export default Gateway;
