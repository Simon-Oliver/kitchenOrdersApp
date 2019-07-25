import React from 'react';

const ErrorMessage = props => {
  if (props.error) {
    return (
      <div class="ui error message">
        <div class="header">{props.error}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorMessage;
