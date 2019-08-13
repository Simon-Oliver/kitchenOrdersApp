import React from 'react';

const OrderItems = props => {
  return (
    <div className="content">
      <h4 className="ui header">{props.item.menuItem}</h4>
      <div className="meta">Allergies:</div>
      <div className="description">{props.item.allergies}</div>
      <div className="meta">Notes:</div>
      <div className="description">{props.item.notes}</div>
    </div>
  );
};

export default OrderItems;
