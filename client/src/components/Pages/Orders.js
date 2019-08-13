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
            this.setState({ orders: data.orders });
          });
        }
      })
      .catch(err => console.log(err));
  }

  renderList(items) {
    console.log(items);
    function groupBy(objectArray, property) {
      return objectArray.reduce(function(acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    items.forEach(e => {
      //test.push(groupBy(e._items, 'menuItem'));
      e._items = groupBy(e._items, 'menuItem');
    });

    // items._items = test;

    return items.map((e, i) => <Order key={i} item={{ ...e }} />);
  }

  render() {
    return <div className="orderList order-container">{this.renderList(this.state.orders)}</div>;
  }
}

export default Orders;
