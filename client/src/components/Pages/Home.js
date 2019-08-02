import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {
    msg: '',
    redirect: '',
    user: ''
  };

  componentDidMount() {
    fetch('/welcome')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ msg: data.msg, user: data.user });
      });
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
          <p>{`Hi ${this.state.user.name}. Your role is "${this.state.user.role}"`}</p>
        ) : (
          <p>You won't know my secret until you login.</p>
        )}
        <button onClick={() => this.onBtnClick()}>Logout</button>
      </div>
    );
  }
}

export default Home;
