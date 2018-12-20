import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import renderHTML from 'react-render-html';
import MediaQuery from 'react-responsive';
import connect from 'react-redux/es/connect/connect';
import { DAEMON } from '../../utils/constants';
import NavBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import './styles.css';
import LoadingSpinner from './LoadingSpinner';
import { SEO, USERS } from '../../actions/restApi';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import userReducer from '../../reducers/user';
import seoReducer, { SEO_VIEW } from '../../reducers/seo';
import userSaga from '../../sagas/user';
import saga from '../../sagas';

const mapDispatchToProps = dispatch => ({
  goTo: payload => {
    dispatch(push(payload.path));
  },
  dispatchAction: ({ type, payload, view }) => {
    dispatch({ type, payload, view });
  },
});

const mapStateToProps = state => ({
  user: state.get(USERS.MODEL).toJS(),
  [SEO_VIEW]: state.get(SEO_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: DAEMON,
});

const withSeoSaga = injectSaga({
  key: SEO.MODEL,
  saga: saga(SEO),
  mode: DAEMON,
});

const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withSeoReducer = injectReducer({
  key: SEO_VIEW,
  reducer: seoReducer,
});

/* eslint-disable react/prefer-stateless-function */
class TemplatePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    dispatchAction: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
  };
  state = {
    showMenu: false,
    helmetContent: '',
  };
  render() {
    return (
      <MediaQuery query="(max-width: 768px)">
        {isPhone => (
          <LoadingSpinner>
            <NavBar
              showMenu={isPhone ? this.state.showMenu : true}
              showToggle={isPhone}
              onToggle={this.onToggle}
              {...this.props}
            />
            <Helmet>{renderHTML(this.state.helmetContent)}</Helmet>
            {this.props.children}
            <Footer />
          </LoadingSpinner>
        )}
      </MediaQuery>
    );
  }
  onToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  componentDidMount() {
    this.props.dispatchAction({
      type: SEO.LIST.REQUESTED,
      payload: {
        query: {
          url: this.props.location.pathname,
        },
      },
      view: SEO_VIEW,
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props[SEO_VIEW][SEO.MODEL].LIST.results !==
      prevProps[SEO_VIEW][SEO.MODEL].LIST.results
    ) {
      if (this.props[SEO_VIEW][SEO.MODEL].LIST.count !== 1) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          helmetContent: '',
        });
      } else {
        const seoData = this.props[SEO_VIEW][SEO.MODEL].LIST.results[0];
        const hasRedirect =
          [undefined, null, ''].indexOf(seoData.redirect_url) === -1;
        if (hasRedirect) {
          this.props.history.push(seoData.redirect_url);
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          helmetContent: this.props[SEO_VIEW][SEO.MODEL].LIST.results[0]
            .head_tags,
        });
      }
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withSeoReducer,
  withUserSaga,
  withSeoSaga,
  withConnect,
)(TemplatePage);
