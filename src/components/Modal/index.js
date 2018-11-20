import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;
    const isNil = (this.modal === null || this.modal === undefined);

    if (!isNil) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { onCloseRequest, children } = this.props;

    return (
      <div className="modal-overlay">
        <div
          className="modal"
          ref={(node) => { this.modal = node; }}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={onCloseRequest}
        >
        X
        </button>
      </div>
    );
  }
}

Modal.defaultProps = {
  children: []
};

Modal.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Modal;
