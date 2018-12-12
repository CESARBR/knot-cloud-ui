import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class CardBody extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="card-body">
        {children}
      </div>
    );
  }
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardBody;
