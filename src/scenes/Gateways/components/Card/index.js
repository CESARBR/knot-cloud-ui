import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Card extends Component {
  render() {
    const { name, uuid, token } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          {name}
        </div>
        <div className="card-body">
          <div className="card-body-field">UUID</div>
          <div className="card-body-value">{uuid}</div>
          <div className="card-body-field">Token</div>
          <div className="card-body-value">{token}</div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  name: 'No name'
};

Card.propTypes = {
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

export default Card;
