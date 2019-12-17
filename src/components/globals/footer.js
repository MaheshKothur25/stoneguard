import React from 'react';
import { NavLink } from 'react-router-dom';
import Picture from '@pawjs/srcset/picture';
import Ebay from '../../resources/img/ebay.png?sizes=1200w+1000w+800w+600w+400w&placeholder';
import LinkedIn from '../../resources/img/linkedin.png?sizes=1200w+1000w+800w+600w+400w&placeholder';

const currentYear = new Date().getFullYear();

export default (props) => (
  <footer className={props.hideFooter ? "hide" : "footer"}>
    <div className="footer page-container">
      <div className="columns">
        <div className="column">
          <p>
            <strong>Stoneguard Equipment</strong>
          </p>
          <br />
          <p>
            <a href="https://goo.gl/maps/DG6mu3Syx55pxmhc7" target="_blank" rel="noopener noreferrer">
              3709 Promontory Point Dr.
              <br />
              Austin, TX 78744
            </a>
          </p>
          <br />
          <NavLink className="footerLink" to="/admin">
            Login
          </NavLink>
        </div>
        <div className="column">
          <a href="mailto:sales@sgcequipment.com" className="footerLink">sales@SGCequipment.com</a>
          <br />
          <br />
          <a href="tel:5128273638">+1.512.827.3638</a>
          <br />
          <br />
          <p>
            <strong>FOLLOW US</strong>
          </p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/sgc-equipment" target="_blank" rel="noopener noreferrer">
              <Picture alt="LinkedIn" image={LinkedIn} />
            </a>
            <a href="https://www.ebay.com/usr/sgcequipment" target="_blank" rel="noopener noreferrer">
              <Picture alt="Ebay" image={Ebay} />
            </a>
          </div>
        </div>
      </div>
      <p className="copyrightText">
        &copy; Copyright&nbsp;
        {currentYear}
        &nbsp;by SGC Equipment. All rights reserved.
      </p>
    </div>
  </footer>
);
