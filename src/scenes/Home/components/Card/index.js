import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class Card extends Component {
  constructor(props) {
    super(props);
    const { header, body } = this.props;
    this.state = { header, body };
  }

  generateDownloadLink() {
    const { body, header } = this.state;
    const clone = body.map(i => i);
    clone.push({ title: 'header', content: header });
    const jsonStr = JSON.stringify(clone.reduce((obj, field) => {
      obj[field.title] = field.content;
      return obj;
    }, {}));
    return `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
  }

  renderBody() {
    const { body } = this.state;
    if (body) {
      return putArrayIndexAsId(body).map(field => (
        !field.isHidden
          ? (
            <CardField
              key={field.id}
              id={field.id}
              title={field.title}
              content={field.content}
              onContentChange={(title, element) => {
                const { id, onBodyChange } = this.props;
                const content = element.value;
                body.forEach((i) => {
                  if (i.title === title) {
                    i.content = content;
                  }
                });
                this.setState({ body });
                document.getElementById(`download-${id}`).href = this.generateDownloadLink();
                // When loses focus call say to upper components that body changes
                element.onblur = () => onBodyChange(title, content);
              }}
            />
          ) : null
      ));
    }
    return null;
  }

  renderDownloadButton() {
    const { body } = this.state;
    const { id } = this.props;
    if (body.length > 0) {
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
    const { id, onHeaderChange } = this.props;
    const { header } = this.state;
    return (
      <div id={id} className="card">
        <div className="card-header">
          <input
            type="text"
            onChange={(e) => {
              const headerChange = e.target.value;
              this.setState({ header: headerChange });
              e.target.onblur = () => onHeaderChange(headerChange);
            }}
            onKeyPress={(e) => { if (e.key === 'Enter') { e.target.blur(); } }}
            value={header}
          />
        </div>
        <ul className="card-body">
          {this.renderBody()}
        </ul>
        <footer className="card-footer">
          {this.renderDownloadButton()}
          {this.renderAction()}
        </footer>
      </div>
    );
  }
}

Card.defaultProps = {
  header: 'No Header',
  body: [],
  action: null,
  onBodyChange: () => {},
  onHeaderChange: () => {}
};

Card.propTypes = {
  header: PropTypes.string,
  body: PropTypes.arrayOf(
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
  onBodyChange: PropTypes.func,
  onHeaderChange: PropTypes.func
};

export default Card;
