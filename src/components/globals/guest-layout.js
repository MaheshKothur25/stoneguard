import React from 'react';
import Header from './header';
import Footer from './footer';

export default function (props) {
  // eslint-disable-next-line
  const { children, hideFooter } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer hideFooter={hideFooter} />
    </div>
  );
}
