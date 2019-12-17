import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../card/card';

const ABC_ARR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class MakerLookup extends React.Component {
  constructor() {
    super();
    this.scrollActiveLetter = this.scrollActiveLetter.bind(this);
    this.setActiveMaker = this.setActiveMaker.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      activeMaker: '',
      searchText: '',
      currentlySearching: false,
      filteredMakers: [],
      showMenu: true,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    const { fetchAllProducts } = this.props;
    fetchAllProducts();
  }

  handleChange = (evt) => {
    const { allManufacturers } = this.props;
    this.setState({ [evt.target.name]: evt.target.value, currentlySearching: true });
    const result = allManufacturers.filter((maker) => {
      if (maker.toLowerCase().includes(evt.target.value)) {
        return maker;
      }
      return null;
    });
    this.setState({ filteredMakers: result });
  };

  scrollActiveLetter = (letter) => {
    const letterHeader = `${letter}-header`;
    const elemToScrollTo = document.getElementById(letterHeader);
    elemToScrollTo.scrollIntoView(true);
    window.scrollBy(0, -100);
  };

  setActiveMaker = (maker) => {
    window.scrollTo(0, 0);
    const { fetchProductsFromMaker } = this.props;
    fetchProductsFromMaker(maker);
    this.setState({ activeMaker: maker, showMenu: false });
  };

  resetState = () => {
    this.setState({
      activeMaker: '',
      searchText: '',
      currentlySearching: false,
      filteredMakers: [],
      showMenu: true,
    });
  };

  renderABCs = () => {
    const alphaMenu = ABC_ARR.map(letter => (
      <li key={letter}>
        <a
          href={null}
          className="alphabet-letter"
          onClick={() => this.scrollActiveLetter(letter)}
        >
          {letter}
        </a>
      </li>
    ));

    return (
      <ul className="menu-list">
        {alphaMenu}
      </ul>
    );
  };

  renderManufacturers = () => {
    const { allManufacturers } = this.props;
    const { activeMaker, currentlySearching, filteredMakers } = this.state;

    let arrayToMap = [];
    if (currentlySearching) {
      arrayToMap = filteredMakers;
    } else {
      arrayToMap = allManufacturers;
    }

    const makerList = arrayToMap.map((maker, index) => {
      if (index > 0 && !currentlySearching) {
        // check for next letter in the alphabet
        const currentCharcode = maker.toUpperCase().charCodeAt(0);
        const previousCharcode = allManufacturers[index - 1].toUpperCase().charCodeAt(0);
        if (previousCharcode !== currentCharcode) {
          const realLetter = String.fromCharCode(currentCharcode);
          return (
            <h5 key={currentCharcode} id={`${realLetter}-header`} className="title is-5 bold letter-header">
              <div className="maker-search-strike" />
              {realLetter}
            </h5>
          );
        }
      }
      if (index === 0 && activeMaker === '') {
        console.log('maker', maker);
        this.setActiveMaker(maker);
        this.setState({ showMenu: true });
      }
      return (
        <li key={maker} className={`${activeMaker === maker ? 'is-active' : ''}`}>
          <a
            href={null}
            className={`${activeMaker === maker ? 'is-active' : ''}`}
            onClick={() => this.setActiveMaker(maker)}
          >
            {maker}
          </a>
        </li>
      );
    });

    return (
      <ul className="menu-list">
        {
          !currentlySearching
          && (
            <h5 id="A-header" className="title is-5 bold letter-header">
              <div className="maker-search-strike" />
              A
            </h5>
          )
        }
        {makerList}
      </ul>
    );
  };

  renderMakerProductCards() {
    const { makersProducts } = this.props;
    const { activeMaker } = this.state;

    if (makersProducts.length > 0) {
      const columns1 = [];
      makersProducts.map(product => (
        columns1.push(
          <div key={product.id} className="column is-half">
            <Card card={product} />
          </div>,
        )
      ));

      return (
        <div id="maker-products-container" className="p-l-xxl p-r-xxl">
          <h2 className="title is-2 warm-grey-text">
            {activeMaker}
          </h2>
          <h5 className="title is-5 has-text-weight-semibold">
            {makersProducts.length}
            &nbsp;Item
            {makersProducts.length > 1 && 's'}
            &nbsp;Found
          </h5>
          <div className="columns is-multiline">
            {columns1}
            {
              columns1.length === 1
              && (
                <div className="column is-half" />
              )
            }
          </div>
        </div>
      );
    }
    return (
      <div id="maker-products-container" className="p-l-xl p-r-xl">
        <h2 className="title is-2 warm-grey-text">
          Choose a maker
        </h2>
      </div>
    );
  }

  render() {
    const { allManufacturers, makersProducts } = this.props;
    const {
      activeMaker,
      searchText,
      currentlySearching,
      showMenu,
    } = this.state;

    return (
      <div>
        <aside id="abc-menu" className={`menu ${!showMenu ? 'is-hidden-mobile' : ''}`}>
          {
            this.renderABCs()
          }
        </aside>
        <aside id="maker-menu" className={`menu ${!showMenu ? 'is-hidden-mobile' : ''}`}>
          <span className="icon has-text-grey-dark" style={{ marginLeft: '-7px' }}>
            <i className="fas fa-chevron-left" />
          </span>
          <Link to="/equipment" id="back-to-search-link">Back to Search</Link>
          <br />
          <h5 className="title is-5 bold letter-header">
            Advanced Maker Lookup
          </h5>
          <div className="field">
            <p className="control has-icons-right">
              <input
                id="maker-search-input"
                className="input is-medium"
                type="text"
                name="searchText"
                placeholder="Search Maker"
                onChange={this.handleChange}
                value={searchText}
              />
              {
                currentlySearching
                && (
                  <a id="clear-search-button" className="button is-white" href={null} onClick={this.resetState}>
                    <span className="icon is-small is-right has-text-grey-dark">
                      <i className="far fa-times-circle" />
                    </span>
                  </a>
                )
              }
            </p>
          </div>
          {
            allManufacturers && this.renderManufacturers()
          }
        </aside>
        <div id="maker-products" className={`${showMenu ? 'is-hidden-mobile' : ''}`}>
          <div className="p-l-xl p-r-xl is-hidden-tablet">
            <div className="breadcrumb pdp-breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><Link to="/equipment">Search</Link></li>
                <li><a href={null} onClick={this.resetState}>Advanced Maker Lookup</a></li>
                <li className="is-active breadcrumb-current">{activeMaker}</li>
              </ul>
            </div>
          </div>
          {
            makersProducts && this.renderMakerProductCards()
          }
        </div>
      </div>
    );
  }
}

MakerLookup.propTypes = {
  allManufacturers: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func,
  fetchProductsFromMaker: PropTypes.func,
  makersProducts: PropTypes.arrayOf(PropTypes.shape),
};

MakerLookup.defaultProps = {
  allManufacturers: [{}],
  fetchAllProducts: () => {},
  makersProducts: [{}],
  fetchProductsFromMaker: () => {},
};

export default MakerLookup;
