import React from 'react';
import OrderItems from './OrderItems';
import moment from 'moment';

class Order extends React.Component {
  state = {};

  renderItemList(items) {
    const order = [];
    for (const item in items) {
      console.log(items[item]);
    }

    // return items.map((e, i) => {
    //   console.log('renderList Order', e);
    //   return <OrderItems key={i} item={e} />;
    // });
  }

  render() {
    console.log('Order Props', this.props.item._items);
    return (
      <div className="ui card">
        <button className="positive ui button">Order Completed</button>
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
