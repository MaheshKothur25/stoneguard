import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllProducts,
  fetchCurrentProduct,
  clearCurrentProduct,
  setSimilarProducts,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import ProductPage from '../../components/product/product-page';

function ProductContainer(props) {
  return (
    <GuestLayout>
      <ProductPage {...props} />
    </GuestLayout>
  );
}

ProductContainer.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.object,
    manufacturer: PropTypes.string,
    asset_number: PropTypes.string,
    make_and_model: PropTypes.string,
    serial_number: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.string,
  }),
  allProducts: PropTypes.arrayOf(PropTypes.shape),
  similarProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func.isRequired,
  fetchCurrentProduct: PropTypes.func.isRequired,
  clearCurrentProduct: PropTypes.func.isRequired,
  setSimilarProducts: PropTypes.func.isRequired,
};

ProductContainer.defaultProps = {
  currentProduct: {},
  allProducts: [{}],
  similarProducts: [{}],
};

function mapStateToProps(state) {
  return {
    currentProduct: state.currentProduct,
    allProducts: state.allProducts,
    similarProducts: state.similarProducts,
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchCurrentProduct,
  clearCurrentProduct,
  setSimilarProducts,
})(ProductContainer);
