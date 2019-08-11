import React from 'react';
import OrderItems from './OrderItems';

class Order extends React.Component {
  state = {};

  renderItemList(items) {
    return items.map((e, i) => <OrderItems key={i} item={e} />);
  }

  render() {
    console.log('order component', this.props);
    return (
      <div class="ui card">
        <div class="content">
          <div class="header">{this.props.item.tableName}</div>
        </div>
        {this.renderItemList(this.props.item._items)}
      </div>
    );
  }
}

export default Order;
