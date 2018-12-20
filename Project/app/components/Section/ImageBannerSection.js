import React from 'react';
import PropTypes from 'prop-types';

function ImageBannerSection(props) {
  return (
    <div
      style={{
        backgroundImage: `url(${props.imageSource})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '330px',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

ImageBannerSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  imageSource: PropTypes.node,
  style: PropTypes.object,
};

export default ImageBannerSection;
