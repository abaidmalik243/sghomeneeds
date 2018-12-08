import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import RegisterMerchantSubsection from './RegisterMerchantSubsection';

import injectReducer from '../../utils/injectReducer';
import { MERCHANTS, USERS } from '../../actions/restApi';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import { RESTART_ON_REMOUNT } from '../../utils/constants';

import './styles.css';
import OneColumn from '../../components/Section/OneColumn';

const mapDispatchToProps = dispatch => ({
  register: payload => {
    dispatch({ type: USERS.REGISTER.REQUESTED, payload });
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
  key: MERCHANTS.MODEL,
  saga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class RegisterMerchantPage extends React.PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TemplatePage {...this.props}>
        <OneColumn id="content">
          <Grid.Column>
            <Subsection id="register-section">
              <PaperWrapper>
                <RegisterMerchantSubsection
                  form={{
                    onSubmit: event => {
                      event.preventDefault();
                      this.props.register({
                        email: event.target.username.value,
                        password: event.target.password.value,
                      });
                    },
                  }}
                />
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
        </OneColumn>
      </TemplatePage>
    );
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {}
}

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterMerchantPage);

// export default RegisterPage;
