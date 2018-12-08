import React from 'react';
import PropTypes from 'prop-types';

function FavoriteButton(props) {
  return (
    <button
      {...props.buttonProps}
      className={`ui circular basic icon button ${props.buttonProps.className}`}
    >
      <i
        {...props.iconProps}
        className={`heart outline icon ${
          props.iconProps.className ? props.iconProps.className : ''
        }`}
        style={{
          position: 'relative',
          left: '-1px',
          top: '1px',
          ...props.iconProps.style,
        }}
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  buttonProps: PropTypes.object.isRequired,
  iconProps: PropTypes.object.isRequired,
};

export default FavoriteButton;
