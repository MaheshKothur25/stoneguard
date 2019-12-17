import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchContactRequests,
} from '../../actions/product-actions';
import GuestLayout from '../../components/globals/guest-layout';
import AdminHeader from '../../components/admin/admin-header';
import ContactRequests from '../../components/admin/contact-requests';

function ContactRequestsContainer(props) {
  return (
    <GuestLayout>
      <AdminHeader />
      <ContactRequests {...props} />
    </GuestLayout>
  );
}

ContactRequestsContainer.propTypes = {
  contactRequests: PropTypes.arrayOf(PropTypes.shape),
  fetchContactRequests: PropTypes.func.isRequired,
  newContactRequestsLength: PropTypes.number,
};

ContactRequestsContainer.defaultProps = {
  contactRequests: [{}],
  newContactRequestsLength: 0,
};

function mapStateToProps(state) {
  return {
    contactRequests: state.contactRequests,
    newContactRequestsLength: state.newContactRequestsLength,
  };
}

export default connect(mapStateToProps, {
  fetchContactRequests,
})(ContactRequestsContainer);
