import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { signOut } from '../../actions/authentication';

class Header extends Component {
  state = {
    redirect: ''
  };

  onBtnClick() {
    fetch('users/auth/logout')
      .then(res => res.json())
      .then(this.props.signOut())
      .then(data => {
        this.setState({ redirect: data.redirect });
      });
  }

  render() {
    return (
      <div className="ui inverted segment">
        <div className="ui inverted secondary pointing menu">
          <NavLink to="/home" className="item" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/register" className="item" activeClassName="active">
            Register
          </NavLink>
          <Link to="/login" className="right item">
            <div className="ui button" onClick={() => this.onBtnClick()}>
              {this.props.isSignedIn ? 'Logout' : 'Login'}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.auth, ...state.status };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Header);
