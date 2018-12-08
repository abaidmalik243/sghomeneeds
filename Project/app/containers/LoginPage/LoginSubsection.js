import React from 'react';
import PropTypes from 'prop-types';
import Subsection from '../../components/Section/Subsection';
import OneColumn from '../../components/Section/OneColumn';
import { orange } from '../../components/Base/constants';
import ButtonWrapper from '../../components/Base/Button';
import Section from '../../components/Section/Section';

import './styles.css';
import LinkWrapper from '../../components/Base/Link';

function LoginSubsection(props) {
  const loginInputIcon = iconName => (
    <i
      className="ui icon"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 4px',
        color: 'orange',
      }}
    >
      <i
        className={`${iconName} icon`}
        style={{ color: orange, fontSize: '18px', margin: '0 6px' }}
      />
      <span style={{ color: '#ccc', margin: '2px' }}>|</span>
    </i>
  );

  return (
    <Section>
      <Subsection id="login-wrapper">
        <h3>Sign In to HomeNeeds!</h3>
        <Subsection id="login-form">
          <form method="POST" {...props.form}>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input
                  name="username"
                  type="email"
                  placeholder="Email"
                  required
                />
                {loginInputIcon('user circle outline')}
              </div>
            </OneColumn>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  maxLength={16}
                />
                {loginInputIcon('unlock alternate')}
              </div>
            </OneColumn>
            <OneColumn>
              <div
                className="ui checkbox"
                style={{ textAlign: 'left', float: 'left' }}
              >
                <input type="checkbox" name="keepSignedIn" />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label>Keep me signed in</label>
              </div>
            </OneColumn>
            <OneColumn>
              <ButtonWrapper design="filled">Sign In</ButtonWrapper>
              <p style={{ marginTop: '8px', color: 'grey' }}>
                Forgot Username and Password?
              </p>
            </OneColumn>
          </form>
        </Subsection>
        <Subsection id="register">
          <OneColumn>
            <div className="ui horizontal divider header">
              <span>New To HomeNeed?</span>
            </div>
            <LinkWrapper to="/register">
              <ButtonWrapper design="outline">Join Now</ButtonWrapper>
            </LinkWrapper>
          </OneColumn>
          <div className="ui divider" />
          <Subsection id="sign-up-tos">
            <p style={{ textAlign: 'left' }}>
              By signing up, signing in or continuing, I agree to HomeNeed{"'"}s{' '}
              <a href="/#">Terms of Use</a> and <a href="/#">Privacy Policy</a>
            </p>
          </Subsection>
        </Subsection>
      </Subsection>
    </Section>
  );
}

LoginSubsection.propTypes = {
  form: PropTypes.object,
  // onSearchChange: PropTypes.func,
};

export default LoginSubsection;
