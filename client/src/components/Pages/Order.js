import React from 'react';
import OrderItems from './OrderItems';
import moment from 'moment';

class Order extends React.Component {
  state = {};

  renderItemList(items) {
    return items.map((e, i) => {
      console.log('renderList Order', e);
      return <OrderItems key={i} item={e} />;
    });
  }

  orderComplete(orderID) {
    fetch('/orders/completed', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ id: orderID }), // data can be `string` or {object}!
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
              username: '',
              password: '',
              password2: '',
              role: ''
            });
          });
        } else {
          res.json().then(data => {
            this.setState({ error: data.error });
          });
        }
      })
      .catch(err => console.log(err));
    console.log(orderID);
  }

  render() {
    console.log('propsItem');
    return (
      <div className="ui card">
        <button
          className="positive ui button"
          onClick={() => this.orderComplete(this.props.item._id)}
        >
          Order Completed
        </button>
        <div className="content">
          <div className="header">{this.props.item.tableName}</div>
          <div className="meta">
            <span>Ordered: {moment(this.props.item.date).format('HH:mm')}</span>
          </div>
        </div>
        {this.renderItemList(this.props.item._items)}
      </div>
    );
  }
}

export default Order;
