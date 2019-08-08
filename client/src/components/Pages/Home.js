import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions/authentication';
import { isError, isSuccess, clearStatus } from '../../actions/status';

class Home extends React.Component {
  state = {
    msg: '',
    redirect: '',
    user: ''
  };

  componentDidMount() {
    // fetch('/welcome')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ msg: data.msg, user: data.user });
    //   });

    fetch('/orders/new', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(['fruit', 'apple', 'carotte', 'cellery']), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div className="ui header">
        <h3>This is the Welcome page</h3>
        {this.state.msg ? (
          <p>{`Hi ${this.state.user.name}. Your role is "${this.state.user.role}"`}</p>
        ) : (
          <p>You won't know my secret until you login.</p>
        )}
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
)(Home);
