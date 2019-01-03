import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Menu, Modal, Segment } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
//
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import RegisterMerchantSubsection from './RegisterMerchantSubsection';

import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import { DAEMON } from '../../utils/constants';

import './styles.css';
// import OneColumn from '../../components/Section/OneColumn';
import SocialLoginSubsection from '../LoginPage/SocialLoginSubsection';
import TwoColumn from '../../components/Section/TwoColumn';

const mapDispatchToProps = dispatch => ({
  register: payload => {
    dispatch({ type: USERS.REGISTER.REQUESTED, payload });
  },
  login: payload => {
    dispatch({ type: USERS.LOGIN.REQUESTED, payload });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class RegisterMerchantPage extends React.PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    users: PropTypes.object,
    location: PropTypes.object,
  };
  state = { openError: false, errorMessage: '', openActivation: false };
  render() {
    const { openError, errorMessage, openActivation } = this.state;
    const { goTo, register } = this.props;
    return (
      <TemplatePage {...this.props}>
        <TwoColumn id="content">
          <Grid.Column>
            <Subsection id="register-section">
              <PaperWrapper>
                <Menu pointing secondary fluid id="user-type-menu">
                  <Menu.Item
                    name="consumer"
                    onClick={() => {
                      goTo({ path: '/register' });
                    }}
                  >
                    Looking for a Professional
                  </Menu.Item>
                  <Menu.Item name="merchant" onClick={() => {}} active>
                    I am a Professional
                  </Menu.Item>
                </Menu>
                <Modal
                  onClose={() => {
                    this.setState({ openError: false });
                  }}
                  open={openError}
                >
                  <Segment id="login-fail">
                    <Header>Login Failed</Header>
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                  </Segment>
                </Modal>
                <Modal
                  onClose={() => {
                    this.setState({ openActivation: false });
                  }}
                  open={openActivation}
                >
                  <Segment id="login-fail">
                    <Header>Register Success</Header>
                    <p>Activation Email has been sent to your email</p>
                  </Segment>
                </Modal>
                <RegisterMerchantSubsection
                  form={{
                    onSubmit: event => {
                      event.preventDefault();
                      register({
                        email: event.target.username.value,
                        password: event.target.password.value,
                        name: event.target.name.value,
                        method: 'email',
                        user_type: 'merchant',
                      });
                    },
                  }}
                />
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection id="social-login-section">
              <SocialLoginSubsection login={register} user_type="merchant" />
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </TemplatePage>
    );
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
    if (
      prevProps.users.loginError.message !== users.loginError.message &&
      users.loginError.message
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        openError: true,
        errorMessage: users.loginError.message,
      });
    }
    if (
      prevProps.users.REGISTER.id !== users.REGISTER.id &&
      users.REGISTER.method === 'email'
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        openActivation: true,
      });
    }
    if (!prevProps.users.isLoggedIn && this.props.users.isLoggedIn) {
      if (
        this.props.location.query &&
        this.props.location.query.redirect !== undefined
      ) {
        this.props.goTo(this.props.location.query.redirect);
      } else {
        this.props.goTo({ path: '/dashboard' });
      }
    }
  }
}

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterMerchantPage);

// export default RegisterPage;
