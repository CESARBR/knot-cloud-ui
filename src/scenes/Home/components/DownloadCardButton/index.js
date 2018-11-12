import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DownloadCardButton extends Component {
  render() {
    const { id, downloadLink } = this.props;
    return (
      <a
        id={id}
        href={downloadLink}
        download="card.json"
      >
        <i className="card-body-action material-icons">file_download</i>
      </a>
    );
  }
}

DownloadCardButton.propTypes = {
  id: PropTypes.string.isRequired,
  downloadLink: PropTypes.string.isRequired
};

export default DownloadCardButton;
