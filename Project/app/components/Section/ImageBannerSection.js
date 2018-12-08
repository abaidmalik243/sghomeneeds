import React from 'react';
import PropTypes from 'prop-types';
import './style.css'


function ImageBannerSection(props) {
  return (
    // <div
    //   style={{
    //     backgroundImage: `url(${props.imageSource})`,
    //     backgroundSize: 'cover',
    //     width: '100vw',
    //     height: '330px',
    //   }}
    // >

    //   {props.children}
    // </div>

    <div>
      <div className="banner_position" >
        <img src={props.imageSource} className="mybanner_setting" />
      </div>
      
      <div className="banner_child">{props.children}</div>
    </div>
  );
}

ImageBannerSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  imageSource: PropTypes.node,
};

export default ImageBannerSection;
