/* eslint-disable no-underscore-dangle */
import React from 'react';
import queryString from 'query-string';
// import { Grid, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MediaQuery from 'react-responsive';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import CompanyList from '../../components/CompanyList';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS, LISTINGS } from '../../actions/restApi';
import ButtonWrapper from '../../components/Base/Button';
// import CustomPagination from '../../components/CustomPagination';
import PaperWrapper from '../../components/Base/Paper';
import './styles.css';
import OneColumn from '../../components/Section/OneColumn';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload, contentType }) => {
    dispatch({ type, payload, view: PROJECT_VIEW, contentType });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [PROJECT_VIEW]: state.get(PROJECT_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withProjectReducer = injectReducer({
  key: PROJECT_VIEW,
  reducer: projectReducer,
});
const withProjectSaga = injectSaga({
  key: PROJECTS.MODEL,
  saga: saga(PROJECTS),
  mode: DAEMON,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ProjectsSelectPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    [PROJECT_VIEW]: PropTypes.object,
  };
  state = {
    selected: [],
  };
  render() {
    // const listings = this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST;
    // const query = queryString.parse(this.props.location.search);
    // const pageNumber =
    //   query.offset && query.limit ? query.offset / query.limit + 1 : 1;
    // const totalPages = listings.count
    //   ? Math.ceil(listings.count / (query.limit || 10))
    //   : 1;
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 991px)">
          {isNotComputer => (
            <Section id="project-select">
              <Subsection>
                <PaperWrapper>
                  <Subsection className="paper-subsection">
                    <h1>
                      Select Pros to speak to<strong>:</strong>
                    </h1>
                    {isNotComputer}
                    <CompanyList
                      companies={this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST}
                      selectable
                      onSelect={this.handleSelect}
                      selected={this.state.selected}
                      dispatchAction={this.props.dispatchAction}
                      user={this.props.user}
                    />
                    <OneColumn id="send-container">
                      <ButtonWrapper
                        design="filled"
                        onClick={this.handleSubmit}
                      >
                        SEND
                      </ButtonWrapper>
                    </OneColumn>
                  </Subsection>
                </PaperWrapper>
              </Subsection>
            </Section>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }
  componentWillMount() {
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: {
        query: queryString.parse(this.props.location.search),
      },
    });
    const query = queryString.parse(this.props.location.search);
    this.setState({ query });
    this.props.dispatchAction({
      type: PROJECTS.GET.REQUESTED,
      payload: {
        id: query.project,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (
      prevProps[PROJECT_VIEW][PROJECTS.MODEL].GET.listings === undefined &&
      this.props[PROJECT_VIEW][PROJECTS.MODEL].GET.listings
    ) {
      const prev =
        this.props[PROJECT_VIEW][PROJECTS.MODEL].GET.listings.slice() || [];
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selected: prev.concat(this.state.selected) });
    }
    if (
      prevProps[PROJECT_VIEW][PROJECTS.MODEL].PATCH.listings !==
      this.props[PROJECT_VIEW][PROJECTS.MODEL].PATCH.listings
    ) {
      this.props.goTo({
        path: `/dashboard/chat?project=${this.state.query.project}`,
      });
    }
  }
  handleSelect = listing => {
    const currentlySelected = this.state.selected.indexOf(listing.id) !== -1;
    if (currentlySelected) {
      const newArray = this.state.selected.slice();
      newArray.splice(this.state.selected.indexOf(listing.id));
      this.setState({ selected: newArray });
    } else {
      const newArray = this.state.selected.slice();
      newArray.push(listing.id);
      this.setState({ selected: newArray });
    }
  };
  handleSubmit = () => {
    const prev =
      this.props[PROJECT_VIEW][PROJECTS.MODEL].GET.listings.slice() || [];
    const listings = prev.concat(this.state.selected);
    if (listings && listings.length > 0) {
      this.props.dispatchAction({
        type: PROJECTS.PATCH.REQUESTED,
        payload: {
          data: {
            listings,
          },
          id: this.state.query.project,
        },
      });
    } else if (listings && listings.length === 0) {
      // eslint-disable-next-line no-alert
      window.alert('No listings selected');
    }
  };
  goToPage(pageNumber) {
    const currentQuery = queryString.parse(this.props.location.search);
    const limit = currentQuery.limit || 10;
    const offset = Math.max((pageNumber - 1) * limit, 0);
    const query = {
      ...currentQuery,
      limit,
      offset,
    };
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: { query },
    });
    const target = `${this.props.location.pathname}?${queryString.stringify(
      query,
    )}`;
    this.props.goTo({ path: target });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withListingSaga,
  withConnect,
)(ProjectsSelectPage);
// export default ProjectsCreatePage;
