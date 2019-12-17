import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ContactForm from '../contact/contact';
import LogoImg from '../../resources/img/stoneguard-logo.png';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const nav = document.querySelector('#navigation');
    const navTop = nav.offsetTop;
    if (window.scrollY >= navTop) {
      // nav offsetHeight = height of nav
      if (window.screen.width < 769) {
        document.body.style.paddingTop = '60px';
      } else {
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
      }
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  };

  toggleMenuBar(e) {
    const { open } = this.state;
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({
      open: !open,
    });
  }

  closeMenuBar() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { location } = this.props;
    let searchInNav = false;
    if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/equipment') {
      searchInNav = true;
    }
    return (
      <div>
        <nav
          id="navigation"
          className={`navbar main-nav ${searchInNav ? 'searchInNav' : ''}`}
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className=" navbar-item">
                <img alt="Stoneguard Logo" src={LogoImg} />
              </Link>
              <button
                type="button"
                onClick={e => this.toggleMenuBar(e)}
                className={`navbar-burger ${open ? 'is-active' : ''}`}
                aria-label="menu"
                aria-expanded="false"
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
            <div className={`navbar-end ${searchInNav ? 'searchInNavMenu' : ''}`}>
              <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/home" onClick={() => this.closeMenuBar()}>
                  Home
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/services" onClick={() => this.closeMenuBar()}>
                  Services
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/equipment" onClick={() => this.closeMenuBar()}>
                  Equipment Search
                </NavLink>
                <NavLink activeClassName="is-active" className="navbar-item is-tab" to="/about-us" onClick={() => this.closeMenuBar()}>
                  About Us
                </NavLink>
                <div className="pure-container" data-effect="pure-effect-slide">
                  <input type="checkbox" id="pure-toggle-right" className="pure-toggle" data-toggle="right" />
                  <label className="navbar-item is-tab pure-toggle-label" htmlFor="pure-toggle-right" data-toggle-label="right">
                    Contact Us
                  </label>

                  <div className="pure-drawer" data-position="right">
                    <label
                      className="pure-toggle-label"
                      htmlFor="pure-toggle-right"
                      data-toggle-label="right"
                      style={{ minHeight: '3rem', alignItems: 'flex-start' }}
                    >
                      <span className="pure-toggle-icon" />
                    </label>
                    <ContactForm inquire={false} />
                  </div>
                  <label className="pure-overlay" htmlFor="pure-toggle-right" data-overlay="right" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
