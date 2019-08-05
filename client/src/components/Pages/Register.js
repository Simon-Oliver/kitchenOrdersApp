import React from 'react';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';

export default class Register extends React.Component {
  state = {
    username: '',
    password: '',
    password2: '',
    role: '',
    error: '',
    redirect: false
  };

  addUser() {
    const { username, password, role } = this.state;

    fetch('/users/register', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ username, password, role }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            this.setState({
              error: '',
              success: data.success,
              username: '',
              password: '',
              password2: '',
              role: '',
              redirect: true
            });
          });
        } else {
          res.json().then(data => {
            this.setState({ error: data.error });
          });
        }
      })
      .catch(err => console.log(err));
  }

  isValidPassword() {
    const { password, password2, role } = this.state;
    if (password.length < 4) {
      return 'Password must be longer than 4 characters';
    } else if (role === '') {
      return 'Please choose a role.';
    } else {
      if (password === password2) {
        return true;
      } else {
        return 'Password is not matching';
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const isValid = this.isValidPassword();

    if (isValid === true) {
      this.addUser();
    } else {
      this.setState({ error: isValid, password: '', password2: '' });
    }
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="ui segment login">
        <h2 className="ui header">Create Account</h2>
        <ErrorMessage error={this.state.error} success={this.state.success} />
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Username</label>
            <input
              required
              value={this.state.username}
              type="text"
              name="username"
              placeholder="Username"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Role</label>
            <select
              name="role"
              className="ui simple dropdown"
              onChange={e => this.handleOnInputChange(e)}
            >
              <option value="">Role</option>
              <option value="kitchen">Kitchen</option>
              <option value="floor">Floor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              required
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
              required
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
