import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';

export default class AddOrder extends Component {
  state = {
    menuItem: '',
    allergies: '',
    notes: '',
    error: '',
    success: '',
    redirect: ''
  };

  onFormSubmit(e) {
    e.preventDefault();
    const { menuItem, allergies, notes } = this.state;
    fetch('/orders/new', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ menuItem, allergies, notes }), // data can be `string` or {object}!
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
              menuItem: '',
              allergies: '',
              notes: ''
            });
          });
        } else {
          res.json().then(data => {
            this.setState({ error: data.error, redirect: data.redirect });
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/login', state: { error: this.state.error } }} />;
    }
    return (
      <div className="ui segment login">
        <h2 className="ui header">Add Order</h2>
        <ErrorMessage error={this.state.error} success={this.state.success} />
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Menu Item:</label>
            <input
              type="text"
              name="menuItem"
              placeholder="Menu Item"
              value={this.state.menuItem}
              required
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Allergies:</label>
            <textarea
              rows="2"
              type="text"
              name="allergies"
              value={this.state.allergies}
              placeholder="Allergies"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Notes:</label>
            <textarea
              type="text"
              name="notes"
              value={this.state.notes}
              placeholder="Notes..."
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="container login-button">
            <button className="ui button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
