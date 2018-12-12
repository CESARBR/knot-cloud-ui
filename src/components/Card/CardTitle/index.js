import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardTitle extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card-title">
        {children}
      </div>
    );
  }
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardTitle;
