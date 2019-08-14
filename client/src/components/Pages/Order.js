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

  render() {
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
