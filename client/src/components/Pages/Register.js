import React from 'react';

const Register = () => {
  return (
    <div class="ui segment login">
      <h2 className="ui header">Create Account</h2>
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
            Create Account
          </button>
          <div class="login-link">
            <a href="/login">Login</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
