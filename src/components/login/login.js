import React from 'react';
import { firebaseAuth } from '../../config/firebase';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.props.history.push('/');
        console.log('user', user);
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({ error: true });
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <section className="main-section m-t-lg">
          <div className="p-l-xxl p-r-xxl">
            <div className="container">
              {
                error
                && (
                  <div className="box">
                    <h2 className="title is-2 red-text">
                      Error logging in
                    </h2>
                  </div>
                )
              }
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={email}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    type="submit"
                    className="button is-success"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
