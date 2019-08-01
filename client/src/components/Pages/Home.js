import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    msg: '',
    redirect: ''
  };

  componentDidMount() {
    fetch('/welcome')
      .then(res => res.json())
      .then(data => this.setState({ msg: data.msg }));
  }

  onBtnClick() {
    fetch('users/auth/logout')
      .then(res => res.json())
      .then(data => {
        this.setState({ redirect: data.redirect });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="ui header">
        <h3>This is the Welcome page</h3>
        {this.state.msg ? (
          <p>{this.state.msg}</p>
        ) : (
          <p>You won't know my secret until you login.</p>
        )}
        <button onClick={() => this.onBtnClick()}>Logout</button>
      </div>
    );
  }
}

export default Home;
