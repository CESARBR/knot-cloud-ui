import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import CardTitle from 'components/Card/CardTitle';

class CardField extends Component {
  render() {
    const {
      id, title, content, onContentChange
    } = this.props;
    return (
      <div className="card-body-field" key={id}>
        <div className="card-body-title">
          <CardTitle title={title} marginLeft="30px" />
        </div>
        <div className="card-body-content">
          <CardTitle
            editable
            title={content}
            marginLeft="30px"
            onTitleChange={change => onContentChange(title, change)}
          />
        </div>
      </div>
    );
  }
}

CardField.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired
};

export default CardField;
