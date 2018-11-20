import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import TextInput from 'components/TextInput';
import CloseButton from './components/CloseButton';
import ModalButton from './components/ModalButton';
import './styles.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDeviceName: '',
      loading: false
    };
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

    if (e.keyCode === 13) {
      e.preventDefault();
      this.buttonClicked();
      window.removeEventListener('keyup', this.handleKeyUp, false);
    } else if (e.keyCode === 27) {
      e.preventDefault();
      onCloseRequest();
      window.removeEventListener('keyup', this.handleKeyUp, false);
    }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (e.target.className === 'modal-overlay') {
      onCloseRequest();
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  buttonClicked() {
    const { onSaveDevice, currentScene } = this.props;
    const { newDeviceName } = this.state;
    const deviceType = currentScene === 'Gateways' ? 'Gateway' : 'App';
    const defaultName = `My KNoT ${deviceType}`;

    this.setState({ loading: true });

    if (!newDeviceName.replace(/\s/g, '').length) {
      onSaveDevice(defaultName);
    } else {
      onSaveDevice(newDeviceName);
    }
  }

  render() {
    const { currentScene, onCloseRequest } = this.props;
    const { loading } = this.state;
    const deviceType = currentScene === 'Gateways' ? 'Gateway' : 'App';

    return (
      <div className="modal-overlay">
        <Card title={`Register ${deviceType}`} titleMarginLeft="30px">
          <div className="modal-content">
            <div className="modal-info">
              <span> Name </span>
              <TextInput type="text" id="name" placeholder={`My KNoT ${deviceType}`} onChange={e => this.setState({ newDeviceName: e.target.value })} />
            </div>
            <div className="modal-button">
              <ModalButton disabled={loading} className="btn-accept" name="OK" onClick={() => this.buttonClicked()} />
            </div>
          </div>
        </Card>
        <CloseButton className="btn-close-x" onClick={onCloseRequest} />
      </div>
    );
  }
}

Modal.propTypes = {
  currentScene: PropTypes.string.isRequired,
  onCloseRequest: PropTypes.func.isRequired,
  onSaveDevice: PropTypes.func.isRequired
};

export default Modal;
