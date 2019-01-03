/* eslint-disable prettier/prettier */
import React from 'react';
// import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import {
  CATEGORIES, FAVOURITES,
  FILES,
  GALLERIES,
  LISTINGS, REVIEWS,
  USERS,
} from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import dashboardReducer, { DASHBOARD_VIEW } from '../../reducers/dashboard';
import saga from '../../sagas';
import userReducer from '../../reducers/user';
import userSaga from '../../sagas/user';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import { profile } from './content';
import AccountSubPage from './AccountSubPage';
import ProfilePaper from './ProfilePaper';
import ListingsSubPage from './ListingsSubPage';
import ReviewsSubPage from './ReviewsSubPage';

import './dashboard.css';
import CommentsSubPage from './CommentsSubPage';
import FavouritesSubPage from './FavouritesSubPage';
import NotificationSettingSubPage from './NotificationSettingSubPage';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload, contentType }) => {
    dispatch({ type, payload, view: DASHBOARD_VIEW, contentType });
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
const withCategorySaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});
const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});
const withFilesSaga = injectSaga({
  key: FILES.MODEL,
  saga: saga(FILES),
  mode: DAEMON,
});
const withReviewsSaga = injectSaga({
  key: REVIEWS.MODEL,
  saga: saga(REVIEWS),
  mode: DAEMON,
});
const withFavouritesSaga = injectSaga({
  key: FAVOURITES.MODEL,
  saga: saga(FAVOURITES),
  mode: DAEMON,
});
const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: DAEMON,
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
    goTo: PropTypes.func,
  };
  render() {
    const { currentTab, user } = this.props;
    return (
      <TemplatePage {...this.props}>
        <Section className="dashboard" id="dashboard-section">
          <Subsection>
            <ProfilePaper profile={profile} {...this.props} />
            {currentTab === 'account' && (
              <AccountSubPage {...this.props} profile={profile} />
            )}
            {currentTab === 'listings' &&
              user.LOAD_AUTH.data.merchantId !== null &&
              user.LOAD_AUTH.data.merchantId !== -1 && (
              <ListingsSubPage {...this.props} />
            )}
            {currentTab === 'reviews' && (
              <ReviewsSubPage {...this.props} />
            )}
            {currentTab === 'comments' && (
              <CommentsSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
            {currentTab === 'favourites' && (
              <FavouritesSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
            {currentTab === 'notifications' && (
              <NotificationSettingSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withDashboardReducer,
  withUserSaga,
  withListingSaga,
  withCategorySaga,
  withFilesSaga,
  withGallerySaga,
  withReviewsSaga,
  withFavouritesSaga,
  withConnect,
)(DashboardPage);
