import React, { Component } from 'react';

export default class OrderForm extends Component {
  state = {
    menuItem: '',
    allergies: '',
    notes: ''
  };

  componentDidMount() {
    // const { menuItem, allergies, notes } = this.props;
    // this.setState({ menuItem, allergies, notes });
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '', success: '' }, () => {
      this.props.onItemChange(this.props.index, {
        menuItem: this.state.menuItem,
        allergies: this.state.allergies,
        notes: this.state.notes
      });
    });
  }

  render() {
    return (
      <div className="ui segment">
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
          <input
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
          <input
            rows="1"
            type="text"
            name="notes"
            value={this.props.notes}
            placeholder="Notes..."
            onChange={e => this.handleOnInputChange(e)}
          />
        </div>
      </div>
    );
  }
}
