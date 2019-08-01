import React, { Component } from 'react';
import './Login.css';
import ErrorMessage from './ErrorMessage';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    success: ''
  };

  loginUser() {
    const { username, password } = this.state;

    fetch('/users/auth', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ username, password }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          this.setState({
            success: `Welcome back ${data.user.name}!`,
            username: '',
            password: '',
            error: ''
          });
        });
      } else {
        res.json().then(data => {
          this.setState({ error: data.error, username: '', password: '' });
        });
      }
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.loginUser();
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="ui segment login">
        <h2 className="ui header">Login</h2>
        <ErrorMessage error={this.state.error} success={this.state.success} />
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              required
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="container login-button">
            <button className="ui button" type="submit">
              Login
            </button>
            <div className="login-link">
              <a href="/register">Create Account</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
