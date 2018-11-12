import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function putArrayIndexAsId(array) {
  // This function is needed due eslint error: react/no-array-index-key
  return array.map((value, index) => {
    value.id = index;
    return value;
  });
}

class Card extends Component {
  renderBody() {
    const { body } = this.props;
    if (body) {
      return putArrayIndexAsId(body).map(field => (
        <div className="card-body-field" key={field.id}>
          <dt className="card-body-title">{field.title ? field.title : 'no title'}</dt>
          <dd className="card-body-content">{field.content ? field.content : '?'}</dd>
        </div>
      ));
    }
    return null;
  }

  renderAction() {
    const { action } = this.props;
    if (action) {
      return (
        <footer className="card-footer">
          <input
            type="image"
            alt="icon"
            className="card-body-action"
            src={action.icon}
            onClick={e => action.click(e.target.parentNode.parentNode.id)}
          />
        </footer>
      );
    }
    return null;
  }

  render() {
    const { header, id } = this.props;
    return (
      <div id={id} className="card">
        <div className="card-header">
          {header}
        </div>
        <dl className="card-body">
          {this.renderBody()}
        </dl>
        {this.renderAction()}
      </div>
    );
  }
}

Card.defaultProps = {
  header: 'No name'
};

Card.defaultProps = {
  header: 'No Header',
  body: [],
  action: null
};

Card.propTypes = {
  header: PropTypes.string,
  body: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired
    })
  ),
  action: PropTypes.shape({
    click: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired
  }),
  id: PropTypes.string.isRequired
};

export default Card;
