import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
// import { LISTINGS, USERS } from '../../actions/restApi';
// import injectReducer from '../../utils/injectReducer';
// import injectSaga from '../../utils/injectSaga';
// import dashboardReducer, { DASHBOARD_VIEW } from '../../reducers/dashboard';
// import saga from '../../sagas';
// import userReducer from '../../reducers/user';
// import userSaga from '../../sagas/user';
// import { DAEMON, RESTART_ON_REMOUNT } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';

import './chat-page.css';
import PaperWrapper from '../../components/Base/Paper';
// import TwoColumn from '../../components/Section/TwoColumn';
//
// const mapDispatchToProps = dispatch => ({
//   dispatchAction: ({ type, payload }) => {
//     dispatch({ type, payload, view: DASHBOARD_VIEW });
//   },
//   goTo: payload => {
//     dispatch(push(payload.path));
//   },
// });
//
// const mapStateToProps = state => ({
//   [DASHBOARD_VIEW]: state.get(DASHBOARD_VIEW).toJS(),
//   user: state.get(USERS.MODEL).toJS(),
// });
//
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
//
// const withDashboardReducer = injectReducer({
//   key: DASHBOARD_VIEW,
//   reducer: dashboardReducer,
// });
// const withListingSaga = injectSaga({
//   key: LISTINGS.MODEL,
//   saga: saga(LISTINGS),
//   mode: DAEMON,
// });
// const withUserReducer = injectReducer({
//   key: USERS.MODEL,
//   reducer: userReducer,
// });
// const withUserSaga = injectSaga({
//   key: USERS.MODEL,
//   saga: userSaga,
//   mode: RESTART_ON_REMOUNT,
// });

/* eslint-disable react/prefer-stateless-function */
class ChatPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    currentTab: PropTypes.string,
    // [DASHBOARD_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Section>
          <Subsection>
            <h1>Messages</h1>
          </Subsection>
          <Subsection className="chat-main">
            <PaperWrapper className="paper">
              <Grid celled style={{ height: '100%' }}>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <h2>All Conversation</h2>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Grid.Row>
                      <Grid.Column>
                        <h2>Company Name</h2>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>Chat</Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <h3>Name</h3>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </PaperWrapper>
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
}

// export default compose(
//   // Put `withReducer` before `withConnect`
//   withUserReducer,
//   withDashboardReducer,
//   withUserSaga,
//   withListingSaga,
//   withConnect,
// )(ChatPage);
export default ChatPage;
