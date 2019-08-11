import React from 'react';

const OrderItems = props => {
  console.log('ORDERITEMS', props);
  return (
    <div class="content">
      <h4 class="ui header">{props.item.menuItem}</h4>
      <div class="meta">Allergies:</div>
      <div class="description">{props.item.allergies}</div>
      <div class="meta">Notes:</div>
      <div class="description">{props.item.notes}</div>
    </div>
  );
};

export default OrderItems;
