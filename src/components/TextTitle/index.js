import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class TextTitle extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    this.state = { title };
  }

  handleBlur(e) {
    const newTitle = e.target.textContent;
    const { onTitleChange } = this.props;
    const { title } = this.state;

    if (newTitle !== title) {
      this.setState({ title: newTitle });
      onTitleChange(newTitle);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') { e.target.blur(); }
  }

  render() {
    const { editable, marginLeft } = this.props;
    const { title } = this.state;
    return (
      <div
        className="text-title-container"
        role="textbox"
        tabIndex="0"
        onKeyPress={e => this.handleKeyPress(e)}
      >
        <h1
          contentEditable={editable}
          suppressContentEditableWarning
          className="text-title"
          onBlur={e => this.handleBlur(e)}
          style={{ marginLeft }}
        >
          {title}
        </h1>
      </div>
    );
  }
}

TextTitle.defaultProps = {
  editable: false,
  onTitleChange: null
};

TextTitle.propTypes = {
  title: PropTypes.string.isRequired,
  marginLeft: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onTitleChange: PropTypes.func
};

export default TextTitle;
