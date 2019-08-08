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
            console.log(data);
            this.setState({ orders: data.orders });
          });
        }
      })
      .catch(err => console.log(err));
  }

  renderList(items) {
    console.log(items);
    //return items.map(e => <Order item={{ ...e }} />);
  }

  render() {
    return <div className="orders">Orders</div>;
  }
}

export default Orders;
