import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllProducts,
  fetchFeaturedProducts,
  setCurrentProduct,
  setSearchResults,
  clearActiveSearch,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import Equipment from '../../components/equipment/equipment';

function EquipmentContainer(props) {
  return (
    <GuestLayout>
      <Equipment {...props} />
    </GuestLayout>
  );
}

EquipmentContainer.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func.isRequired,
  featuredProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchFeaturedProducts: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape),
  activeSearch: PropTypes.bool,
  clearActiveSearch: PropTypes.func.isRequired,
};

EquipmentContainer.defaultProps = {
  allProducts: [{}],
  featuredProducts: [{}],
  searchResults: [{}],
  activeSearch: false,
};

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    featuredProducts: state.featuredProducts,
    searchResults: state.searchResults,
    activeSearch: state.activeSearch,
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchFeaturedProducts,
  setCurrentProduct,
  setSearchResults,
  clearActiveSearch,
})(EquipmentContainer);
