import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
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
      type: PropTypes.oneOf([Card])
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Card])
      })
    )
  ])
};

export default CardBoard;
