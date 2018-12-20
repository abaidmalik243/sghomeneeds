import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import Button from '../Base/Button';
import './styles.css';
function Subscribe(props) {
  return (
    <div
      style={{
        textAlign: 'left',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {props.headerText}
      <Input
        className="footerStyle"
        onChange={props.onNameChange}
        placeholder="Name"
        style={{ width: '100%' }}
      />
      <br />
      <br />
      <Input
        onChange={props.onEmailChange}
        placeholder="Email"
        className="footerStyle"
        style={{ width: '100%' }}
      />
      <br />
      <br />
      <Button
        design={props.buttonType}
        onClick={props.onSubmit}
        className="subscriber_footer_btn"
      >
        {[props.buttonText]}
      </Button>
    </div>
  );
}

Subscribe.propTypes = {
  headerText: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  onSubmit: PropTypes.func,
  onNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
};

export default Subscribe;
