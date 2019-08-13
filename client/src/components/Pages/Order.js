import React from 'react';
import OrderItems from './OrderItems';
import moment from 'moment';

class Order extends React.Component {
  state = {};

  renderItemList(items) {
    return items.map((e, i) => <OrderItems key={i} item={e} />);
  }

  render() {
    console.log('order component', moment(this.props.item.date).format('HH:mm'));
    return (
      <div class="ui card">
        <button class="positive ui button">Order Completed</button>
        <div class="content">
          <div class="header">{this.props.item.tableName}</div>
          <div class="meta">
            <span>Ordered: {moment(this.props.item.date).format('HH:mm')}</span>
          </div>
        </div>
        {this.renderItemList(this.props.item._items)}
      </div>
    );
  }
}

export default Order;
