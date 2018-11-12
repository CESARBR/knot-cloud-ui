import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextTitle from 'components/TextTitle';
import './styles.css';

class DeviceProperty extends Component {
  render() {
    const {
      title, editable, value, onValueChange
    } = this.props;
    return (
      <div className="device-property">
        <div className="device-property-key">
          <TextTitle title={title} marginLeft="30px" />
        </div>
        <div className="device-property-value">
          <TextTitle
            editable={editable}
            title={value}
            marginLeft="30px"
            onTitleChange={change => onValueChange(title, change)}
          />
        </div>
      </div>
    );
  }
}

DeviceProperty.defaultProps = {
  editable: false
};

DeviceProperty.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default DeviceProperty;
