import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextTitle from 'components/TextTitle';
import CardHeader from './components/CardHeader';
import CardBody from './components/CardBody';
import './styles.css';

class Card extends Component {
  render() {
    const {
      children, childrenHeader, title, titleEditable, onTitleChange, titleMarginLeft
    } = this.props;
    return (
      <div className="card">
        <CardHeader>
          <TextTitle
            editable={titleEditable}
            title={title}
            onTitleChange={onTitleChange}
            marginLeft={titleMarginLeft}
          />
          {childrenHeader}
        </CardHeader>
        <CardBody>
          {children}
        </CardBody>
      </div>
    );
  }
}

Card.defaultProps = {
  childrenHeader: null,
  onTitleChange: null,
  titleEditable: false
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  titleMarginLeft: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func,
  titleEditable: PropTypes.bool,
  childrenHeader: PropTypes.node,
  children: PropTypes.node.isRequired
};

export default Card;
