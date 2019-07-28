import React from 'react';

const ErrorMessage = props => {
  if (props.error) {
    return (
      <div className="ui error message">
        <div className="header">{props.error}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorMessage;
