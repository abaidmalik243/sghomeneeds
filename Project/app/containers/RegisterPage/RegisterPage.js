import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import RegisterSubsection from './RegisterSubsection';
import SocialLoginSubsection from '../LoginPage/SocialLoginSubsection';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import { RESTART_ON_REMOUNT } from '../../utils/constants';

import './styles.css';

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
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class RegisterPage extends React.PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    users: PropTypes.object,
    goTo: PropTypes.func,
    location: PropTypes.object,
  };
  render() {
    const { register, login, goTo } = this.props;
    return (
      <TemplatePage {...this.props}>
        <TwoColumn id="content">
          <Grid.Column>
            <Subsection id="register-section">
              <PaperWrapper>
                <Menu pointing secondary fluid id="user-type-menu">
                  <Menu.Item name="consumer" active onClick={() => {}}>
                    Looking for a Professional
                  </Menu.Item>
                  <Menu.Item
                    name="merchant"
                    onClick={() => {
                      goTo({ path: '/register-merchant' });
                    }}
                  >
                    I am a Professional
                  </Menu.Item>
                </Menu>
                <RegisterSubsection
                  form={{
                    onSubmit: event => {
                      event.preventDefault();
                      register({
                        email: event.target.username.value,
                        password: event.target.password.value,
                        method: 'email',
                        user_type: 'consumer',
                      });
                    },
                  }}
                />
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection id="social-login-section">
              <SocialLoginSubsection login={login} user_type="consumer" />
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </TemplatePage>
    );
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.users.isLoggedIn && this.props.users.isLoggedIn) {
      if (
        this.props.location.query &&
        this.props.location.query.redirect !== undefined
      ) {
        this.props.goTo(this.props.location.query.redirect);
      } else {
        this.props.goTo('/dashboard');
      }
    }
  }
}

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);

// export default RegisterPage;
