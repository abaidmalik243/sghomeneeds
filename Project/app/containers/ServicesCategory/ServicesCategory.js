import React from 'react';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import MediaQuery from 'react-responsive';
import renderHTML from 'react-render-html';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import TemplatePage from '../Common/PageWrapper';
import ImageBannerSection from '../../components/Section/ImageBannerSection';
import Subsection from '../../components/Section/Subsection';
import './services-category.css';
import { CATEGORIES, LISTINGS, USERS } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import servicesReducer from '../../reducers/services';
import injectSaga from '../../utils/injectSaga';
import categorySaga from '../../sagas/category';
import { DAEMON } from '../../utils/constants';
import saga from '../../sagas';
import ChildCategory from './ChildCategory';
import ParentCategory from './ParentCategory';
import { getS3Image } from '../../utils/images';

export const SERVICES_VIEW = 'services';

const banner = getS3Image(
  '/images/ServicesPage/apartment-architecture-carpet-584399.png',
);

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: SERVICES_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload));
  },
});

const mapStateToProps = state => ({
  [SERVICES_VIEW]: state.get(SERVICES_VIEW).toJS(),
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: SERVICES_VIEW,
  reducer: servicesReducer,
});

const withSaga = injectSaga({
  key: `${SERVICES_VIEW}/${CATEGORIES.MODEL}`,
  saga: categorySaga,
  mode: DAEMON,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ServicesCategory extends React.Component {
  static propTypes = {
    dispatchAction: PropTypes.func,
    params: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    search: PropTypes.object,
    GET_WITH_CHILDREN: PropTypes.object,
    users: PropTypes.object,
    goTo: PropTypes.func,
  };

  render() {
    const { main, children } = this.props[SERVICES_VIEW][
      CATEGORIES.MODEL
    ].GET_WITH_CHILDREN;

    const query = queryString.parse(this.props.location.search);
    const pageNumber = parseInt(query.page || 1, 10);
    const { slug } = this.props.match.params;
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 767px)">
          {isPhone => (
            <div className="service-category-wrapper">
              <ImageBannerSection
                imageSource={banner}
                style={{ height: '200px' }}
              >
                <Subsection className="banner-title">
                  <h1>
                    {main &&
                      main.name &&
                      `What ${renderHTML(
                        main.name,
                      )} service are you searching for?`}
                  </h1>
                </Subsection>
              </ImageBannerSection>
              {children && children.length > 0 ? (
                <ParentCategory
                  parent={main}
                  childrenCategories={children}
                  {...{ isPhone }}
                />
              ) : (
                <ChildCategory
                  listings={this.props[SERVICES_VIEW][LISTINGS.MODEL].LIST}
                  page={pageNumber}
                  slug={slug}
                  name={main && main.name && renderHTML(main.name)}
                  goTo={this.props.goTo}
                  users={this.props.users}
                  dispatchAction={this.props.dispatchAction}
                  {...{ isPhone }}
                />
              )}
              {main && main.looking_for ? (
                <Subsection>
                  <h3>Are you looking for:</h3>
                  <p>{renderHTML(main.looking_for)}</p>
                </Subsection>
              ) : null}
            </div>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }

  componentDidMount() {
    this.props.dispatchAction({
      type: CATEGORIES.GET_WITH_CHILDREN.REQUESTED,
      payload: { query: { slug: this.props.match.params.slug } },
    });
  }

  componentDidUpdate(prevProps) {
    const { main, children } = this.props[SERVICES_VIEW][
      CATEGORIES.MODEL
    ].GET_WITH_CHILDREN;
    const { main: prevMain } = prevProps[SERVICES_VIEW][
      CATEGORIES.MODEL
    ].GET_WITH_CHILDREN;
    if (
      children &&
      children.length === 0 &&
      (!isEqual(main, prevMain) ||
        prevProps.location.search !== this.props.location.search)
    ) {
      const { page } = queryString.parse(this.props.location.search);
      const offsetQuery = page && page > 1 ? (page - 1) * 10 : '';
      this.props.dispatchAction({
        type: LISTINGS.LIST.REQUESTED,
        payload: {
          query: { categories: main.slug, offset: offsetQuery },
        },
      });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withListingSaga,
  withConnect,
)(ServicesCategory);
