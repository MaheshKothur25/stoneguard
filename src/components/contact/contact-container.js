import React from 'react';
import GuestLayout from '../../components/globals/guest-layout';
import ContactForm from "./contact";

function ContactContainer(props) {
  return (
    <GuestLayout>
      <div className="contact-container">
        <ContactForm {...props} />
      </div>
    </GuestLayout>
  );
}

export default ContactContainer;
