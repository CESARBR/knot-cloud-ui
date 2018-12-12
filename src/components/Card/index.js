import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Card extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card">
        {children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
