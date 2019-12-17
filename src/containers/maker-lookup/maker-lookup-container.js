import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllProducts,
  fetchProductsFromMaker,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import MakerLookup from '../../components/equipment/maker-lookup';

function MakerLookupContainer(props) {
  return (
    <GuestLayout>
      <MakerLookup {...props} />
    </GuestLayout>
  );
}

MakerLookupContainer.propTypes = {
  allManufacturers: PropTypes.arrayOf(PropTypes.shape),
  fetchAllProducts: PropTypes.func.isRequired,
  makersProducts: PropTypes.arrayOf(PropTypes.shape),
  fetchProductsFromMaker: PropTypes.func.isRequired,
};

MakerLookupContainer.defaultProps = {
  allManufacturers: [{}],
  makersProducts: [{}],
};

function mapStateToProps(state) {
  return {
    allManufacturers: state.allManufacturers,
    makersProducts: state.makersProducts,
  };
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  fetchProductsFromMaker,
})(MakerLookupContainer);
