import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import DeviceProperty from './components/DeviceProperty';
import './styles.css';

class DeviceCard extends Component {
  constructor(props) {
    super(props);
    const { device } = this.props;
    this.state = { device };
  }

  handleNameChange(newName) {
    const { device } = this.state;
    const { onPropertyChange } = this.props;

    device.metadata.name = newName;
    this.setState({ device });
    onPropertyChange('name', newName);
  }

  mapObjToProperties(obj, hide, editable) {
    return Object.keys(obj).map((property) => {
      if (!hide.includes(property)) {
        return (
          <DeviceProperty
            key={property}
            editable={editable}
            title={property}
            value={obj[property] instanceof Object ? JSON.stringify(obj[property])
              : obj[property].toString()}
            onValueChange={(key, value) => {
              const { device } = this.state;
              const { onPropertyChange } = this.props;
              try {
                obj[key] = JSON.parse(value);
              } catch (error) {
                obj[key] = value;
              }
              this.setState({ device });
              onPropertyChange(key, value);
            }}
          />
        );
      } return null;
    });
  }

  renderBody() {
    const { device } = this.state;
    const metadataPropsToHide = ['name'];
    const knotPropsToHide = ['router', 'user', 'gateways'];
    let properties = [];
    if (device.metadata) {
      properties = properties.concat(this.mapObjToProperties(
        device.metadata,
        metadataPropsToHide,
        true
      ));
    }
    if (device.knot) {
      properties = properties.concat(this.mapObjToProperties(
        device.knot,
        knotPropsToHide,
        false
      ));
    }
    return properties;
  }

  renderDownloadButton() {
    const { device } = this.state;
    const { onDownload } = this.props;
    return (
      <a
        id={`download-${device.uuid}`}
        href="/"
        onClick={(e) => {
          e.target.parentNode.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(onDownload(), null, 2))}`);
        }}
        onBlur={e => e.target.setAttribute('href', '/')}
        download="card.json"
      >
        <i className="card-body-action material-icons">file_download</i>
      </a>
    );
  }

  renderDeleteButton() {
    const { onDelete, device } = this.props;
    return (
      <i
        role="button"
        tabIndex="0"
        className="card-body-action material-icons"
        onClick={() => onDelete(device.uuid)}
        onKeyPress={() => onDelete(device.uuid)}
      >
        delete
      </i>
    );
  }

  render() {
    const { device } = this.props;
    return (
      <div id={device.uuid} className="card-device">
        <Card
          titleEditable
          title={device.metadata ? device.metadata.name : ''}
          onTitleChange={newName => this.handleNameChange(newName)}
          titleMarginLeft="15px"
        >
          <div className="card-body-device">
            {this.renderBody()}
            <footer className="card-footer">
              {this.renderDownloadButton()}
              {this.renderDeleteButton()}
            </footer>
          </div>
        </Card>
      </div>
    );
  }
}

DeviceCard.defaultProps = {
  device: {},
  onPropertyChange: null,
  onDownload: null,
  onDelete: null
};

DeviceCard.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  onPropertyChange: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func
};

export default DeviceCard;
