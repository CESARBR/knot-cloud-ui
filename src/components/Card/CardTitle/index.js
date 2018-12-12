import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardTitle extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    this.state = { title };
  }

  render() {
    const { children, onTitleChange, marginLeft } = this.props;
    const { title } = this.state;
    return (
      <div className="card-title">
        <input
          type="text"
          onChange={(e) => {
            const titleChange = e.target.value;
            this.setState({ title: titleChange });
            e.target.onblur = () => onTitleChange(titleChange);
          }}
          onKeyPress={(e) => { if (e.key === 'Enter') { e.target.blur(); } }}
          value={title}
          style={{ 'padding-left': marginLeft }}
        />
        {children}
      </div>
    );
  }
}

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  marginLeft: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CardTitle;
