import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardHeader extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card-header">
        {children}
      </div>
    );
  }
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardHeader;
