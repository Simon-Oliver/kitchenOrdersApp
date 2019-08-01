import React from 'react';

class Home extends React.Component {
  state = {
    msg: ''
  };

  componentDidMount() {
    fetch('/welcome')
      .then(res => res.json())
      .then(data => this.setState({ msg: data.msg }));
  }

  render() {
    return (
      <div className="ui header">
        <h3>This is the Welcome page</h3>
        {this.state.msg ? (
          <p>{this.state.msg}</p>
        ) : (
          <p>You won't know my secret until you login.</p>
        )}
      </div>
    );
  }
}

export default Home;
