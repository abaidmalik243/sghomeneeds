import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Card(props) {
  return (
    <div className="ui card full-width-card" {...props}>
      {props.children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Card;
