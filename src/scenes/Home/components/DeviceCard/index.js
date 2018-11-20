import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import CardTitle from 'components/Card/CardTitle';
import CardBody from 'components/Card/CardBody';
import CardField from 'scenes/Home/components/CardField';
import DownloadCardButton from 'scenes/Home/components/DownloadCardButton';
import './styles.css';

// This function is needed due eslint error: react/no-array-index-key
function putArrayIndexAsId(array) {
  return array.map((value, index) => {
    value.id = index;
    return value;
  });
}

class DeviceCard extends Component {
  constructor(props) {
    super(props);
    const { title, properties } = this.props;
    this.state = { title, properties };
  }

  generateDownloadLink() {
    const { properties, title } = this.state;
    const clone = properties.map(i => i);
    clone.push({ title: 'title', content: title });
    const jsonStr = JSON.stringify(clone.reduce((obj, field) => {
      obj[field.title] = field.content;
      return obj;
    }, {}));
    return `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
  }

  renderBody() {
    const { properties } = this.state;
    if (properties) {
      return putArrayIndexAsId(properties).map(field => (
        !field.isHidden
          ? (
            <CardField
              key={field.id}
              id={field.id}
              title={field.title}
              content={field.content}
              onContentChange={(title, element) => {
                const { id, onPropertyChange } = this.props;
                const content = element.value;
                properties.forEach((i) => {
                  if (i.title === title) {
                    i.content = content;
                  }
                });
                this.setState({ properties });
                document.getElementById(`download-${id}`).href = this.generateDownloadLink();
                // When loses focus call say to upper components that body changes
                element.onblur = () => onPropertyChange(title, content);
              }}
            />
          ) : null
      ));
    }
    return null;
  }

  renderDownloadButton() {
    const { properties } = this.state;
    const { id } = this.props;
    if (properties.length > 0) {
      return (
        <DownloadCardButton id={`download-${id}`} downloadLink={this.generateDownloadLink()} />
      );
    }
    return null;
  }

  renderAction() {
    const { action } = this.props;
    if (action) {
      return (
        <i
          role="button"
          tabIndex="0"
          className="card-body-action material-icons"
          onClick={e => action.click(e.target.parentNode.parentNode.id)}
          onKeyPress={e => action.click(e.target.parentNode.parentNode.id)}
        >
          {action.icon}
        </i>
      );
    }
    return null;
  }

  render() {
    const { id, onTitleChange } = this.props;
    const { title } = this.state;
    return (
      <div id={id} className="card-device">
        <Card>
          <CardTitle>
            <input
              type="text"
              onChange={(e) => {
                const titleChange = e.target.value;
                this.setState({ title: titleChange });
                e.target.onblur = () => onTitleChange(titleChange);
              }}
              onKeyPress={(e) => { if (e.key === 'Enter') { e.target.blur(); } }}
              value={title}
            />
          </CardTitle>
          <CardBody>
            {this.renderBody()}
            <footer className="card-footer">
              {this.renderDownloadButton()}
              {this.renderAction()}
            </footer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

DeviceCard.defaultProps = {
  title: 'No title',
  properties: [],
  action: null,
  onPropertyChange: () => {},
  onTitleChange: () => {}
};

DeviceCard.propTypes = {
  title: PropTypes.string,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      isHidden: PropTypes.bool.isRequired
    })
  ),
  action: PropTypes.shape({
    click: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired // This icon is based in material css names
  }),
  id: PropTypes.string.isRequired,
  onPropertyChange: PropTypes.func,
  onTitleChange: PropTypes.func
};

export default DeviceCard;
