import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signOut } from '../../actions/authentication';
import { isError, isSuccess, clearStatus } from '../../actions/status';
import './Login.css';
import ErrorMessage from './ErrorMessage';

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: ''
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const { error } = this.props.location.state;
      if (error) {
        this.setState({
          error
        });
      }
    }
  }

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
          const { id, name, role } = data.user;
          this.props.isSuccess(`Welcome back ${name}!`);
          this.props.signIn(id, role, name);
          this.setState({
            username: '',
            password: '',
            redirect: '/home'
          });
        });
      } else {
        res.json().then(data => {
          this.props.isError(data.error);
          this.setState({ username: '', password: '' });
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
    this.props.clearStatus();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div className="ui segment login">
        <h2 className="ui header">Login</h2>
        <ErrorMessage error={this.props.error} success={this.props.success} />
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

const mapStateToProps = state => {
  return { ...state.auth, ...state.status };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, isError, isSuccess, clearStatus }
)(Login);
