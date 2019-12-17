import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import Search from '../search/search';

class Equipment extends React.Component {
  constructor() {
    super();
    this.handleChangeDBType = this.handleChangeDBType.bind(this);
    this.state = {
      dbType: 'all',
    }
  }
  componentWillMount() {
    const { fetchFeaturedProducts, fetchAllProducts } = this.props;
    // make sure this number is 6 to have 2 rows of 3 columns
    fetchFeaturedProducts(6);
    fetchAllProducts();
  }

  handleChangeDBType = (evt) => {
    this.setState({ dbType: evt.target.value });
  };

  renderFeaturedProductCards(searchActive) {
    const { dbType } = this.state;
    const { featuredProducts, searchResults, setCurrentProduct } = this.props;

    let arrayToMap = [];

    if (searchActive && searchResults) {
      arrayToMap = searchResults;
    } else if (!searchActive && featuredProducts) {
      arrayToMap = featuredProducts;
    }

    let count = 0;

    if (arrayToMap.length > 0) {
      const cols = arrayToMap.map(product => {
        if (!searchActive) {
          return (
            <div key={product.id} className="column is-one-third-desktop is-half-tablet">
              <Card card={product} setProduct={() => setCurrentProduct(product)} />
            </div>
          )
        } else {
          if (dbType === 'all') {
            count++;
            return (
              <div key={product.id} className="column is-one-third-desktop is-half-tablet">
                <Card card={product} setProduct={() => setCurrentProduct(product)} />
              </div>
            )
          } else if (dbType === 'for_sale') {
            if (product.status === 'for_sale') {
              count++;
              return (
                <div key={product.id} className="column is-one-third-desktop is-half-tablet">
                  <Card card={product} setProduct={() => setCurrentProduct(product)}/>
                </div>
              )
            }
          } else if (dbType === 'sold') {
            if (product.status !== 'for_sale') {
              count++;
              return (
                <div key={product.id} className="column is-one-third-desktop is-half-tablet">
                  <Card card={product} setProduct={() => setCurrentProduct(product)} />
                </div>
              )
            }
          }
        }
        return null;
      });

      if (count > 0 || !searchActive) {
        return (
          <div className="page-container featured-product-section">
            <h5 className="title is-5 has-text-weight-semibold white-text">
              {searchActive ? `${count} Result${count > 1 ? 's' : ''} Found` : 'Recent Items' +
                ' Available'}
            </h5>
            <div className="columns is-multiline">
              {cols}
            </div>
          </div>
        );
      }
    }
    return (
      <div className="page-container">
        <h5 className="title is-5 has-text-weight-semibold white-text">
          {searchActive ? `${arrayToMap.length} Results Found` : 'Recent Items Available'}
        </h5>
        <div className="no-products-found">
          <h3 className="title is-3">
            Sorry, no products were found.
          </h3>
        </div>
      </div>
    );
  }

  render() {
    const { allProducts, setSearchResults, activeSearch, dbType } = this.props;
    return (
      <div>
        <div className="top-img-container">
          <div className="top-img-equipment" />
        </div>
        <span className="is-hidden-tablet">
          <Search
            buttonClass="is-success"
            haystack={allProducts}
            searchSubmit={setSearchResults}
          />
        </span>
        <section className="card-section">
          <span className="is-hidden-mobile">
            <Search
              buttonClass="is-success"
              haystack={allProducts}
              searchSubmit={setSearchResults}
            />
          </span>
          <div className="page-container">
            <h5 id="filter-text" className="title is-5 has-text-weight-semibold white-text">
              Filter
            </h5>
            <div className="select is-medium inventory-select">
              <select name="inventory_status" onChange={this.handleChangeDBType} value={dbType}>
                <option value="all">All Products</option>
                <option value="for_sale">Products For Sale</option>
                <option value="sold">Products Sold</option>
              </select>
            </div>
          </div>
          {this.renderFeaturedProductCards(activeSearch)}
        </section>
      </div>
    );
  }
}

Equipment.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func,
  featuredProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchFeaturedProducts: PropTypes.func,
  setCurrentProduct: PropTypes.func,
  setSearchResults: PropTypes.func,
  searchResults: PropTypes.arrayOf(PropTypes.shape),
  activeSearch: PropTypes.bool,
};

Equipment.defaultProps = {
  allProducts: [{}],
  fetchAllProducts: () => {},
  featuredProducts: [{}],
  fetchFeaturedProducts: () => {},
  setCurrentProduct: () => {},
  setSearchResults: () => {},
  searchResults: [{}],
  activeSearch: false,
};

export default Equipment;
