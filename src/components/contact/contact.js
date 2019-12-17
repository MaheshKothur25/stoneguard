import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import emailIsValid from '../../utils/validateEmail';
import { contactRef } from '../../config/firebase';

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      fullNameError: false,
      company: '',
      email: '',
      emailInvalid: false,
      phone: '',
      message: '',
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
      message,
      recaptcha,
    } = this.state;

    const emailTest = emailIsValid(email);

    if (fullName.length === 0) {
      this.setState({ fullNameError: true });
    }

    if (!emailTest) {
      this.setState({ emailInvalid: true });
    }

    const newPostKey = contactRef.push().key;
    const postData = {
      fullName,
      company,
      email,
      phone,
      message,
      archived: false,
      favorite: false,
      time_sent: new Date(),
      key: newPostKey,
    };
    const updates = {};
    updates[newPostKey] = postData;

    if (recaptcha && fullName.length > 0 && email.length > 0 && emailTest) {
      this.setState({ submitted: true });
      return contactRef.update(updates);
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

    return (
      <div>
        {
          submitted
          && (
            <div>
              <h2 className="title is-2 warm-grey-text">
                Message Sent!
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
                Contact Us
              </h2>
              <p>
                Call us at
                <a href="tel:5128273638" className="warm-grey-text bold"> +1.512.827.3638 </a>
                or fill out a contact form to reach our inbox and we will contact you.
              </p>
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
                  <textarea
                    className="textarea"
                    name="message"
                    placeholder="Tell us more..."
                    onChange={this.handleChange}
                  />
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

export default ContactForm;
