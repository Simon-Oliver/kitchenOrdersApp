import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';
import OrderForm from './OrderForm';
import './OrderForm.css';

export default class AddOrder extends Component {
  state = {
    success: '',
    redirect: '',
    orders: []
  };

  componentDidMount() {
    console.log(this.state.orders);
  }

  onFormSubmit(e) {
    // e.preventDefault();
    // const { orders } = this.state;
    // fetch('/orders/new', {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(orders), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //       res.json().then(data => {
    //         this.setState({
    //           error: '',
    //           success: data.success,
    //           menuItem: '',
    //           allergies: '',
    //           notes: ''
    //         });
    //       });
    //     } else {
    //       res.json().then(data => {
    //         this.setState({ error: data.error, redirect: data.redirect });
    //       });
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  handleOnInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '', success: '' });
  }

  renderOrderItems(orders) {
    return orders.map(e => {
      return <OrderForm menuItem={e.menuItem} allergies={e.allergies} notes={e.notes} />;
    });
  }

  addOrderItem(e) {
    this.setState(prevState => ({
      orders: [...prevState.orders, { menuItem: '', allergies: '', notes: '' }]
    }));
    console.log('clicked', this.state);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/login', state: { error: this.state.error } }} />;
    }
    return (
      <div className="ui segment" id="orderForm">
        <h2 className="ui header">New Order</h2>
        <ErrorMessage error={this.state.error} success={this.state.success} />
        {this.renderOrderItems(this.state.orders)}
        <button class="circular ui big icon button" onClick={e => this.addOrderItem(e)}>
          <i class="icon plus"></i>
        </button>
      </div>
    );
  }
}
