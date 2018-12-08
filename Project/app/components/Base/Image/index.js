import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

function ImageWrapper(props) {
  return (
    <Image
      src={props.src}
      {...props}
      className={`${props.rounded ? 'circular' : ''} ${props.className || ''}`}
    />
  );
}

ImageWrapper.propTypes = {
  src: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  rounded: PropTypes.bool,
  className: PropTypes.string,
};

export default ImageWrapper;
