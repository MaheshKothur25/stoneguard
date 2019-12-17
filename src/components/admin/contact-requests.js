import React from 'react';
import PropTypes from 'prop-types';
import Login from '../login/login';
import { contactRef, firebaseAuth } from '../../config/firebase';

class ContactRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      mailbox: 'new',
      contactRequestsState: [],
      authenticated: false,
    };
  }

  componentWillMount() {
    const { fetchContactRequests } = this.props;
    fetchContactRequests();
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authenticated) => {
      this.setState({ authenticated });
    });
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.contactRequests !== newProps.contactRequests) {
      // eslint-disable-next-line
      this.setState({ contactRequestsState: newProps.contactRequests });
    }
  }

  archiveRequest = (key, value) => {
    const updates = {};
    updates[`${key}/archived`] = !value;
    contactRef.update(updates);
    const {
      fetchContactRequests,
    } = this.props;
    fetchContactRequests();
  };

  favoriteRequest = (key, value) => {
    const updates = {};
    updates[`${key}/favorite`] = !value;
    contactRef.update(updates);
    const {
      fetchContactRequests,
    } = this.props;
    fetchContactRequests();
  };

  handleChangeMailbox = (type) => {
    this.setState({ mailbox: type });
    const {
      fetchContactRequests,
    } = this.props;
    fetchContactRequests();
  };

  renderBoxContents = (request) => {
    const datesent = new Date(request.time_sent).toDateString();
    const timesent = new Date(request.time_sent).toLocaleTimeString();
    return (
      <div key={request.key} className="box" style={{ width: '100%' }}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {request.fullName}
                </strong>
                <small style={{ float: 'right' }}>
                  {datesent}
                  &nbsp;-&nbsp;
                  {timesent}
                </small>
                <br />
                <strong>Email: </strong>
                {request.email}
                <br />
                <strong>Phone: </strong>
                {request.phone}
                <br />
                <strong>Company: </strong>
                {request.company}
              </p>
              <br />
              <p>
                <strong>Message: </strong>
              </p>
              <p>
                {request.message}
              </p>
            </div>
            <div className="level is-mobile">
              <div className="level-left">
                <a href={`mailto:${request.email}`} className="level-item" aria-label="reply">
                  <span className="icon is-small">
                    <i className="fas fa-reply" aria-hidden="true" />
                  </span>
                </a>
                <a
                  href={null}
                  className="level-item"
                  aria-label="like"
                  onClick={() => this.favoriteRequest(request.key, request.favorite)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-heart" aria-hidden="true" />
                  </span>
                </a>
              </div>
              <div className="level-right">
                <a
                  href={null}
                  className="level-item"
                  aria-label="archive"
                  onClick={() => this.archiveRequest(request.key, request.archived)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-archive" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  };

  renderRequests = (type) => {
    let requests;
    const boxes = [];
    const { contactRequests } = this.props;
    const { contactRequestsState } = this.state;

    if (contactRequestsState && contactRequestsState.length > 0) {
      requests = contactRequestsState;
    } else {
      requests = contactRequests;
    }

    // eslint-disable-next-line
    requests && requests.map(request => {
      if (type === 'new' && !request.archived && !request.favorite) {
        if (Object.keys(request).length !== 0 && request.constructor === Object) {
          boxes.push(this.renderBoxContents(request));
        }
      } else if (type === 'archived' && request.archived) {
        boxes.push(this.renderBoxContents(request));
      } else if (type === 'favorited' && request.favorite) {
        boxes.push(this.renderBoxContents(request));
      }
    });

    return (
      <div>
        {
          boxes.length === 0
            ? (
              <div key="empty" className="box" style={{ width: '100%' }}>
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p key="empty">
                        <strong>Empty</strong>
                        <br />
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <div>
                {boxes}
              </div>
            )
        }
      </div>
    );
  };

  render() {
    const { mailbox, authenticated } = this.state;
    const { newContactRequestsLength } = this.props;

    if (!authenticated) {
      return <Login />;
    }

    return (
      <div className="container mailbox-container">
        <div className="columns">
          <div className="column">
            <div className="panel">
              <p className="panel-heading">
                Contact Requests
              </p>
              <a
                href={null}
                className={`panel-block ${mailbox === 'new' ? 'is-active' : ''}`}
                onClick={() => this.handleChangeMailbox('new')}
              >
                <span className="panel-icon">
                  <i className="fas fa-envelope" aria-hidden="true" />
                </span>
                New
                <span className="tag is-rounded is-success right-tag">
                  {newContactRequestsLength}
                </span>
              </a>
              <a
                href={null}
                className={`panel-block ${mailbox === 'favorites' ? 'is-active' : ''}`}
                onClick={() => this.handleChangeMailbox('favorited')}
              >
                <span className="panel-icon">
                  <i className="fas fa-heart" aria-hidden="true" />
                </span>
                Favorites
              </a>
              <a
                href={null}
                className={`panel-block ${mailbox === 'archived' ? 'is-active' : ''}`}
                onClick={() => this.handleChangeMailbox('archived')}
              >
                <span className="panel-icon">
                  <i className="fas fa-archive" aria-hidden="true" />
                </span>
                Archived
              </a>
            </div>
          </div>
          <div className="column is-two-thirds">
            {this.renderRequests(mailbox)}
          </div>
        </div>
      </div>
    );
  }
}

ContactRequests.propTypes = {
  contactRequests: PropTypes.arrayOf(PropTypes.shape),
  fetchContactRequests: PropTypes.func,
  newContactRequestsLength: PropTypes.number,
};

ContactRequests.defaultProps = {
  contactRequests: [],
  fetchContactRequests: () => {},
  newContactRequestsLength: 0,
};

export default ContactRequests;
