import React from 'react';

const Register = () => {
  return (
    <div className="ui segment login">
      <h2 className="ui header">Create Account</h2>
      <form className="ui form">
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="Password" />
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
};

export default Register;
