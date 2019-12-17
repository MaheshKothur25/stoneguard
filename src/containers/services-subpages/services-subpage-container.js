import React from 'react';
import GuestLayout from '../../components/globals/guest-layout';
import ServicesSubpage from '../../components/services/services-subpage';

function ServicesSubpageContainer(props) {
  return (
    <GuestLayout>
      <ServicesSubpage {...props} />
    </GuestLayout>
  );
}

export default ServicesSubpageContainer;
