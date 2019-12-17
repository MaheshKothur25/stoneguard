import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllProducts,
  setCurrentProduct,
  setSearchResults,
  clearActiveSearch,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import Home from '../../components/home/home';

function HomeContainer(props) {
  return (
    <GuestLayout>
      <Home {...props} />
    </GuestLayout>
  );
}

HomeContainer.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape),
  clearActiveSearch: PropTypes.func.isRequired,
  activeSearch: PropTypes.bool,
};

HomeContainer.defaultProps = {
  allProducts: [{}],
  searchResults: [{}],
  activeSearch: false,
};

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  setCurrentProduct,
  setSearchResults,
  clearActiveSearch,
})(HomeContainer);
