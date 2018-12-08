import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkWrapper(props) {
  return (
    <Link href to={props.href} {...props}>
      {props.children}
    </Link>
  );
}

LinkWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  href: PropTypes.string,
};

export default LinkWrapper;
