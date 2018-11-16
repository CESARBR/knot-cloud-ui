import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import './styles.css';

const AddButton = ({ onClick }) => (
  <Button className="btn-new-device" name="+" type="button" onClick={onClick} />
);

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AddButton;
