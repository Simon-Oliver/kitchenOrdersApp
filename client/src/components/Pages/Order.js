import React from 'react';

const Order = props => {
  console.log('order component', props);
  return (
    <div class="ui card">
      <div class="content">
        <div class="header">{props.item.menuItem}</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Allergies</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">{props.item.allergies}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <button class="ui button">Join Project</button>
      </div>
    </div>
  );
};

export default Order;
