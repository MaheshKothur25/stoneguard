import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllProducts,
  fetchProductsForSale,
  fetchSoldProducts,
  setDbType,
  setSearchResults,
  clearActiveSearch,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import AdminWrapper from '../../components/admin/admin-wrapper';
import AdminHeader from '../../components/admin/admin-header';

function AdminContainer(props) {
  return (
    <GuestLayout>
      <AdminHeader />
      <AdminWrapper {...props} />
    </GuestLayout>
  );
}

AdminContainer.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func.isRequired,
  allProductsForSale: PropTypes.arrayOf(PropTypes.shape),
  fetchProductsForSale: PropTypes.func.isRequired,
  allSoldProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchSoldProducts: PropTypes.func.isRequired,
  setDbType: PropTypes.func.isRequired,
  dbType: PropTypes.string,
  setSearchResults: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape),
  activeSearch: PropTypes.bool,
  clearActiveSearch: PropTypes.func.isRequired,
};

AdminContainer.defaultProps = {
  allProducts: [{}],
  allProductsForSale: [{}],
  allSoldProducts: [{}],
  dbType: 'for_sale',
  searchResults: [{}],
  activeSearch: false,
};

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    allProductsForSale: state.allProductsForSale,
    allSoldProducts: state.allSoldProducts,
    dbType: state.dbType,
    searchResults: state.searchResults,
    activeSearch: state.activeSearch,
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchProductsForSale,
  fetchSoldProducts,
  setDbType,
  setSearchResults,
  clearActiveSearch,
})(AdminContainer);
