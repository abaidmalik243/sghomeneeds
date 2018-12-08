import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TransitionablePortal, Segment, Header } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import LoginSubsection from './LoginSubsection';
import SocialLoginSubsection from './SocialLoginSubsection';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { RESTART_ON_REMOUNT } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';

const mapDispatchToProps = dispatch => ({
  login: payload => {
    dispatch({ type: USERS.LOGIN.REQUESTED, payload });
  },
});

const mapStateToProps = state => ({
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class LoginPage extends React.PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  loginWithEmail = event => {
    event.preventDefault();
    this.props.login({
      method: 'email',
      username: event.target.username.value,
      password: event.target.password.value,
    });
  };

  render() {
    const { user, login } = this.props;
    return (
      <TemplatePage {...this.props}>
        <TwoColumn id="content">
          <Grid.Column>
            <Subsection id="login-section">
              <PaperWrapper>
                <TransitionablePortal open={!!user.loginError.message}>
                  <Segment id="login-fail">
                    <Header>Login Failed</Header>
                    <p style={{ color: 'red' }}>{user.loginError.message}</p>
                  </Segment>
                </TransitionablePortal>
                <LoginSubsection
                  form={{
                    onSubmit: this.loginWithEmail,
                  }}
                />
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection id="social-login-section">
              <SocialLoginSubsection login={login} />
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);

// export default LoginPage;
