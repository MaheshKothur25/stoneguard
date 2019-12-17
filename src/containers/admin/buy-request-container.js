import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchBuyRequests,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import AdminHeader from '../../components/admin/admin-header';
import BuyRequests from '../../components/admin/buy-requests';

function BuyRequestsContainer(props) {
  return (
    <GuestLayout>
      <AdminHeader />
      <BuyRequests {...props} />
    </GuestLayout>
  );
}

BuyRequestsContainer.propTypes = {
  buyRequests: PropTypes.arrayOf(PropTypes.shape),
  fetchBuyRequests: PropTypes.func.isRequired,
  newRequestsLength: PropTypes.number,
};

BuyRequestsContainer.defaultProps = {
  buyRequests: [{}],
  newRequestsLength: 0,
};

function mapStateToProps(state) {
  return {
    buyRequests: state.buyRequests,
    newRequestsLength: state.newRequestsLength,
  };
}

export default connect(mapStateToProps, {
  fetchBuyRequests,
})(BuyRequestsContainer);
