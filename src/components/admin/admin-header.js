import React from 'react';
import { NavLink } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebase';

class AdminHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authenticated) => {
      this.setState({ authenticated });
    });
  }

  render() {
    const { authenticated } = this.state;

    if (!authenticated) {
      return <span />;
    }
    return (
      <div>
        <div id="admin-navigation" className="navbar is-info admin-nav" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-end">
              <div className="navbar-menu">
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/admin">
                  Products
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/buy-requests">
                  Buy Requests
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/contact-requests">
                  Contact Requests
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/cms">
                  CMS
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHeader;
