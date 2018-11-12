import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeviceCard from '../DeviceCard';
import './styles.css';

class CardBoard extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="cardboard">
        {children}
      </div>
    );
  }
}

CardBoard.defaultProps = {
  children: []
};

CardBoard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([DeviceCard])
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([DeviceCard])
      })
    )
  ])
};

export default CardBoard;
