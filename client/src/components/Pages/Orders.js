import React, { Component } from 'react';
import Order from './Order';
import './Orders.css';

class Orders extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    fetch('/orders')
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log('data orders raw', data);
            const filteredData = data.orders.filter(e => e.orderComplete !== true);
            this.setState({ orders: filteredData });
          });
        }
      })
      .catch(err => console.log(err));
  }

  renderList(items) {
    console.log(items);
    return items.map((e, i) => <Order key={i} item={{ ...e }} />);
  }

  render() {
    return <div className="orderList order-container">{this.renderList(this.state.orders)}</div>;
  }
}

export default Orders;
