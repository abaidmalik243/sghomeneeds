import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function NavigationMenuItem(props) {
  return (
    <a className="item" {...props.a} style={{padding:'0px 10px'}}>
      <span className="menu-item">{props.a.text}</span>
    </a>
  );
}

NavigationMenuItem.propTypes = {
  a: PropTypes.object,
};

export default NavigationMenuItem;
