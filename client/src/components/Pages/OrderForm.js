import React, { Component } from 'react';

export default class OrderForm extends Component {
  state = {
    menuItem: '',
    allergies: '',
    notes: ''
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '', success: '' });
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Menu Item:</label>
            <input
              type="text"
              name="menuItem"
              placeholder="Menu Item"
              value={this.props.menuItem}
              required
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Allergies:</label>
            <textarea
              rows="1"
              type="text"
              name="allergies"
              value={this.props.allergies}
              placeholder="Allergies"
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          <div className="field">
            <label>Notes:</label>
            <textarea
              rows="2"
              type="text"
              name="notes"
              value={this.props.notes}
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
