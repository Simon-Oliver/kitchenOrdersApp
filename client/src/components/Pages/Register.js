import React from 'react';
import ErrorMessage from './ErrorMessage';

export default class Register extends React.Component {
  state = {
    username: '',
    password: '',
    password2: '',
    error: ''
  };

  addUser() {
    const { username, password } = this.state;

    fetch('/users/register', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ username, password }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setState({ error: '', username: '', password: '', password2: '' });
  }

  isValidPassword() {
    const { password, password2 } = this.state;
    if (password.length < 4) {
      throw new Error('Password must be longer than 4 characters');
    } else {
      if (password === password2) {
        return true;
      } else {
        throw new Error('Password is not matching');
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(JSON.stringify({ username, password }));
    try {
      this.isValidPassword();
      this.addUser();
      console.log('added User');
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error.message);
    }
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="ui segment login">
        <h2 className="ui header">Create Account</h2>
        <ErrorMessage error={this.state.error} />
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Username</label>
            <input
              value={this.state.username}
              type="text"
              name="username"
              placeholder="Username"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              value={this.state.password}
              type="text"
              name="password"
              placeholder="Password"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              value={this.state.password2}
              type="text"
              name="password2"
              placeholder="Confirm Password"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="container login-button">
            <button className="ui button" type="submit">
              Create Account
            </button>
            <div className="login-link">
              <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
