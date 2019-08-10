import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';
import OrderForm from './OrderForm';
import './OrderForm.css';

export default class AddOrder extends Component {
  state = {
    success: '',
    error: '',
    redirect: '',
    tableName: '',
    orders: [{ menuItem: '', allergies: '', notes: '' }]
  };

  componentDidMount() {}

  onFormSubmit(e) {
    e.preventDefault();
    const { orders, tableName } = this.state;
    fetch('/orders/new', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ tableName, orders }), // data can be `string` or {object}!
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

  // handleOnInputChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value, error: '', success: '' });
  // }

  onItemChange = (i, update) => {
    this.setState(prevState => {
      prevState.orders[i] = update;
      return { orders: prevState.orders };
    });
  };

  deleteItem = i => {
    console.log(i);
    this.setState(prevState => {
      prevState.orders.splice(i, 1);
      return { orders: prevState.orders };
    });
  };

  renderOrderItems(orders) {
    return orders.map((e, i) => {
      return (
        <OrderForm
          key={i}
          index={i}
          menuItem={e.menuItem}
          allergies={e.allergies}
          notes={e.notes}
          onItemChange={this.onItemChange}
          deleteItem={this.deleteItem}
        />
      );
    });
  }

  addOrderItem(e) {
    this.setState(prevState => ({
      orders: [...prevState.orders, { menuItem: '', allergies: '', notes: '' }]
    }));
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '', success: '' });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/login', state: { error: this.state.error } }} />;
    }
    return (
      <div className="ui segment" id="orderForm">
        <ErrorMessage error={this.state.error} success={this.state.success} />
        <h2 className="ui header">New Order</h2>
        <form className="ui form" onSubmit={e => this.onFormSubmit(e)}>
          <div className="field">
            <label>Tabel Name:</label>
            <input
              type="text"
              name="tableName"
              placeholder="Tabel Name"
              value={this.props.tableName}
              required
              onChange={e => this.handleOnInputChange(e)}
            />
          </div>
          {this.renderOrderItems(this.state.orders)}
          <div className="container login-button">
            <button className="ui green button" type="submit">
              Add Order
            </button>
          </div>
        </form>
        <button
          id="addItem"
          className="circular ui huge red icon button"
          onClick={e => this.addOrderItem(e)}
        >
          <i className="icon plus"></i>
        </button>
      </div>
    );
  }
}
