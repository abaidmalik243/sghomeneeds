import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';
import Subsection from '../../components/Section/Subsection';
import ThreeColumn from '../../components/Section/ThreeColumn';

import ButtonWrapper from '../../components/Base/Button';
import { GALLERY_VIEW } from '../../reducers/gallery';
import Section from '../../components/Section/Section';
import LinkWrapper from '../../components/Base/Link';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: GALLERY_VIEW });
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
class NotFoundPage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
    dispatchAction: PropTypes.func,
  };
  state = {};
  render() {
    return (
      <TemplatePage {...this.props}>
        <Section id="not-found-page">
          <Section className="header">
            <h1>Sorry! That page does not seem to exist</h1>
          </Section>
          <Subsection className="buttons">
            <ThreeColumn>
              <Grid.Column>
                <LinkWrapper href="/">
                  <ButtonWrapper design="filled">
                    Back to Home Page
                  </ButtonWrapper>
                </LinkWrapper>
              </Grid.Column>
              <Grid.Column>
                <LinkWrapper href="/articles">
                  <ButtonWrapper design="filled">Read Articles</ButtonWrapper>
                </LinkWrapper>
              </Grid.Column>
              <Grid.Column>
                <LinkWrapper href="/services">
                  <ButtonWrapper design="filled">Access Services</ButtonWrapper>
                </LinkWrapper>
              </Grid.Column>
            </ThreeColumn>
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(NotFoundPage);
