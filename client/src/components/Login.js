import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div class="ui segment login">
        <h2 className="ui header">Login</h2>
        <form class="ui form">
          <div class="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="text" name="password" placeholder="Password" />
          </div>
          <div className="container login-button">
            <button class="ui button" type="submit">
              Login
            </button>
            <div class="login-link">
              <a href="#">Create Account</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
