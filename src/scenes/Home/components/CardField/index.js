import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class CardField extends Component {
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = {
      input: content
    };
  }

  handleChange(e) {
    const { title, onContentChange } = this.props;
    this.setState({ input: e.target.value });
    onContentChange(title, e.target);
  }

  render() {
    const { id, title } = this.props;
    const { input } = this.state;
    return (
      <div className="card-body-field" key={id}>
        <dt className="card-body-title">{title || 'no title'}</dt>
        <input
          type="text"
          onChange={e => this.handleChange(e)}
          onKeyPress={(e) => { if (e.key === 'Enter') { e.target.blur(); } }}
          className="card-body-content"
          value={input}
        />
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
