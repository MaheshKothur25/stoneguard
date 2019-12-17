import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import emailIsValid from '../../utils/validateEmail';
import { buyRef } from '../../config/firebase';

class InquireForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      fullNameError: false,
      company: '',
      email: '',
      emailInvalid: false,
      phone: '',
      submitted: false,
      recaptcha: false,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      company,
      email,
      phone,
      recaptcha,
    } = this.state;
    const { product } = this.props;
    if (fullName.length === 0) {
      this.setState({ fullNameError: true });
    }

    const emailTest = emailIsValid(email);
    if (!emailTest) {
      this.setState({ emailInvalid: true });
    }

    const newPostKey = buyRef.push().key;
    const postData = {
      fullName,
      company,
      email,
      phone,
      productId: product.id,
      productName: product.make_and_model,
      productAsset: product.asset_number,
      archived: false,
      favorite: false,
      time_sent: new Date(),
      key: newPostKey,
    };

    const updates = {};
    updates[newPostKey] = postData;

    if (recaptcha && fullName.length > 0 && email.length > 0 && emailTest) {
      this.setState({ submitted: true });
      return buyRef.update(updates);
    }

    return null;
  };

  handleRecaptcha = (value) => {
    if (value) {
      this.setState({ recaptcha: true });
    }
  };

  render() {
    const {
      emailInvalid,
      fullNameError,
      email,
      submitted,
      recaptcha,
    } = this.state;
    const { product } = this.props;
    return (
      <div>
        {
          submitted
          && (
            <div>
              <h2 className="title is-2 warm-grey-text">
                Inquire Sent!
              </h2>
              <p className="label" style={{ marginTop: '2rem', fontWeight: '300' }}>
                Thanks for connecting with us, we will get back to you within 1-2 business days.
                A confirmation email was also sent to&nbsp;
                {email}
              </p>
            </div>
          )
        }
        {
          !submitted
          && (
            <form onSubmit={this.handleSubmit}>
              <h2 className="title is-2 warm-grey-text">
                Inquire
              </h2>
              <div className="field">
                <div className="control contact-us-control">
                  <input
                    className={`input ${fullNameError ? 'is-danger' : ''}`}
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={this.handleChange}
                  />
                  { fullNameError && <p className="help is-danger">Name is required</p>}
                </div>
              </div>

              <div className="field">
                <div className="control contact-us-control">
                  <input
                    className="input"
                    type="text"
                    name="company"
                    placeholder="Company (Optional)"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control contact-us-control">
                  <input
                    className={`input ${emailInvalid ? 'is-danger' : ''}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                  { emailInvalid && <p className="help is-danger">Email is invalid</p>}
                </div>
              </div>

              <div className="field">
                <div className="control contact-us-control">
                  <input
                    className="input"
                    type="text"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control contact-us-control contact-us-button">
                  <label className="label" style={{ marginTop: '2rem', fontWeight: '300' }}>
                    Looking to inquire about the following item:
                  </label>
                  <div className="input product-inquire-input" style={{ marginTop: 0 }}>
                    {product.make_and_model}
                  </div>
                </div>
              </div>

              <br />

              <ReCAPTCHA
                sitekey="6Ld_oMYUAAAAAOrMXeWbQR9OmmfYLaszbiyMFF5k"
                onChange={this.handleRecaptcha}
              />

              <div className="field">
                <div className="control contact-us-control contact-us-button">
                  <button type="submit" className="button is-primary is-rounded" onClick={this.handleSubmit} disabled={!recaptcha}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )
        }
      </div>
    );
  }
}

InquireForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.object,
    manufacturer: PropTypes.string,
    asset_number: PropTypes.string,
    make_and_model: PropTypes.string,
    serial_number: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default InquireForm;
