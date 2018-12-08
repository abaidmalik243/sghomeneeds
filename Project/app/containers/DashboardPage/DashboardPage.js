import React from 'react';
// import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import { LISTINGS, USERS } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import dashboardReducer, { DASHBOARD_VIEW } from '../../reducers/dashboard';
import saga from '../../sagas';
import userReducer from '../../reducers/user';
import userSaga from '../../sagas/user';
import { DAEMON, RESTART_ON_REMOUNT } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import { profile, reviews } from './content';
import AccountSubPage from './AccountSubPage';
import ProfilePaper from './ProfilePaper';
import ListingsSubPage from './ListingsSubPage';
import ReviewsSubPage from './ReviewsSubPage';

import './dashboard.css';
import CommentsSubPage from './CommentsSubPage';
import FavouritesSubPage from './FavouritesSubPage';
import NotificationSettingSubPage from './NotificationSettingSubPage';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: DASHBOARD_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [DASHBOARD_VIEW]: state.get(DASHBOARD_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withDashboardReducer = injectReducer({
  key: DASHBOARD_VIEW,
  reducer: dashboardReducer,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});
const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class DashboardPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    currentTab: PropTypes.string,
    [DASHBOARD_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Section>
          <Subsection>
            <ProfilePaper profile={profile} {...this.props} />
            <AccountSubPage {...this.props} profile={profile} />
            <ListingsSubPage {...this.props} />
            <ReviewsSubPage {...this.props} reviews={reviews} />
            <CommentsSubPage
              dispatchAction={this.props.dispatchAction}
              {...this.props}
            />
            <FavouritesSubPage
              dispatchAction={this.props.dispatchAction}
              {...this.props}
            />
            <NotificationSettingSubPage
              dispatchAction={this.props.dispatchAction}
              {...this.props}
            />
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }

  componentWillMount() {
    this.props.dispatchAction({ type: USERS.LOAD_AUTH.REQUESTED });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withDashboardReducer,
  withUserSaga,
  withListingSaga,
  withConnect,
)(DashboardPage);
