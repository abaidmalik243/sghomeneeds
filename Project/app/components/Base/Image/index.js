import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

function ImageWrapper(props) {
  const { src, rounded, className, ...otherProps } = props;
  return (
    <Image
      {...otherProps}
      src={src}
      className={`${rounded ? 'circular' : ''} ${className || ''}`}
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
