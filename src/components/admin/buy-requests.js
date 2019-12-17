import React from 'react';
import PropTypes from 'prop-types';
import Login from '../login/login';
import { buyRef, firebaseAuth } from '../../config/firebase';

class BuyRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      mailbox: 'new',
      buyRequestsState: [],
    };
  }

  componentWillMount() {
    const { fetchBuyRequests } = this.props;
    fetchBuyRequests();
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authenticated) => {
      this.setState({ authenticated });
    });
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.buyRequests !== newProps.buyRequests) {
      // eslint-disable-next-line
      this.setState({ buyRequestsState: newProps.buyRequests });
    }
  }

  archiveRequest = (key, value) => {
    const updates = {};
    updates[`${key}/archived`] = !value;
    buyRef.update(updates);
    const {
      fetchBuyRequests,
    } = this.props;
    fetchBuyRequests();
  };

  favoriteRequest = (key, value) => {
    const updates = {};
    updates[`${key}/favorite`] = !value;
    buyRef.update(updates);
    const {
      fetchBuyRequests,
    } = this.props;
    fetchBuyRequests();
  };

  handleChangeMailbox = (type) => {
    this.setState({ mailbox: type });
    const {
      fetchBuyRequests,
    } = this.props;
    fetchBuyRequests();
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
              <p><strong>Product Info</strong></p>
              <p>
                <strong>Asset #: </strong>
                {request.productAsset}
                <br />
                <strong>Make & Model: </strong>
                {request.productName}
                <br />
                <br />
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
    const { buyRequests } = this.props;
    const { buyRequestsState } = this.state;

    if (buyRequestsState && buyRequestsState.length > 0) {
      requests = buyRequestsState;
    } else {
      requests = buyRequests;
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
    const { newRequestsLength } = this.props;

    if (!authenticated) {
      return <Login />;
    }

    return (
      <div className="container mailbox-container">
        <div className="columns">
          <div className="column">
            <div className="panel">
              <p className="panel-heading">
                Buy Requests
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
                  {newRequestsLength}
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

BuyRequests.propTypes = {
  buyRequests: PropTypes.arrayOf(PropTypes.shape),
  fetchBuyRequests: PropTypes.func,
  newRequestsLength: PropTypes.number,
};

BuyRequests.defaultProps = {
  buyRequests: [],
  fetchBuyRequests: () => {},
  newRequestsLength: 0,
};

export default BuyRequests;
