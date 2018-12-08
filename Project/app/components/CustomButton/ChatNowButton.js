import React from 'react';
import PropTypes from 'prop-types';
import './custom-button.css';
function ChatNowButton(props) {
  return (
    <button
      {...props.buttonProps}
      className={`ui button filled chat-now ${props.buttonProps.className}`}
      style={{
        ...props.buttonProps.style,
      }}
    >
      <i
        {...props.iconProps}
        className={`comments outline icon ${props.iconProps.className}`}
      />&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Chat Now
    </button>
  );
}

ChatNowButton.propTypes = {
  buttonProps: PropTypes.object.isRequired,
  iconProps: PropTypes.object.isRequired,
};

export default ChatNowButton;
