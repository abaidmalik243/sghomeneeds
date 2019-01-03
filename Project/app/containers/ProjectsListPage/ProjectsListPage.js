/* eslint-disable no-underscore-dangle */
import React from 'react';
import v4 from 'uuid/v4';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MediaQuery from 'react-responsive';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import Card from '../../components/Base/Card/Card';
import CardHeader from '../../components/Base/Card/CardHeader';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS } from '../../actions/restApi';
import ThreeColumn from '../../components/Section/ThreeColumn';
// import { projects } from './content';
import ImageWrapper from '../../components/Base/Image';
import RocketImage from '../../images/projects-rocket.png';
import './styles.css';
import CardContent from '../../components/Base/Card/CardContent';
import ButtonWrapper from '../../components/Base/Button';
import LinkWrapper from '../../components/Base/Link';
import TwoColumn from '../../components/Section/TwoColumn';
import PencilIcon from '../../images/pencil-icon.png';

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

/* eslint-disable react/prefer-stateless-function */
class ProjectsListPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  render() {
    const projects = this.props[PROJECT_VIEW][PROJECTS.MODEL].LIST;
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 991px)">
          {isNotComputer => (
            <Section id="projects-list">
              <Subsection style={{ padding: 0 }}>
                <div className="title-wrapper">
                  <ImageWrapper src={RocketImage} height="40px" />
                  <h1>Projects</h1>
                </div>
                <Subsection>
                  <ThreeColumn stackable>
                    {isNotComputer}
                    {projects.results.map(project => (
                      <Grid.Column key={v4()}>
                        <Card className="project-card">
                          <CardHeader
                            style={{
                              backgroundColor: 'rgba(235, 235, 235, 0.251)',
                            }}
                          >
                            <Subsection
                              style={{ width: '90%', paddingTop: '10px' }}
                            >
                              <TwoColumn stackable>
                                <Grid.Column>
                                  <div className="card-header-date-wrapper">
                                    <p>
                                      {new Date(
                                        project.created_at,
                                      ).toDateString()}
                                    </p>
                                  </div>
                                </Grid.Column>
                                <Grid.Column>
                                  <div className="card-header-type-wrapper">
                                    <span>Type: </span>
                                    <span>
                                      <ButtonWrapper
                                        design="outline"
                                        className="category-button"
                                      >
                                        {this.getCategoryName(
                                          JSON.parse(project.form_data)
                                            .category,
                                        )}
                                      </ButtonWrapper>
                                    </span>
                                  </div>
                                </Grid.Column>
                              </TwoColumn>
                              <h2 className="card-title">{project.title}</h2>
                            </Subsection>
                          </CardHeader>
                          <CardContent>
                            <Subsection>
                              <div className="card-content">
                                <ButtonWrapper
                                  design="filled"
                                  className="card-button"
                                  onClick={() => {
                                    this.props.goTo({
                                      path: `/dashboard/chat?project=${
                                        project.id
                                      }`,
                                    });
                                  }}
                                >
                                  Speak to shortlisted professionals
                                </ButtonWrapper>
                                <LinkWrapper
                                  href={`/dashboard/projects/select?project=${
                                    project.id
                                  }`}
                                  className="card-select-link"
                                >
                                  Select more professionals to speak to
                                </LinkWrapper>
                              </div>
                            </Subsection>
                          </CardContent>
                          <CardContent>
                            <Subsection style={{ paddingBottom: '0px' }}>
                              <div className="card-status-content">
                                <div>
                                  <span>Status: </span>
                                  <span>
                                    <strong>{project.status}</strong>
                                  </span>
                                  <div className=" circled">
                                    <ImageWrapper src={PencilIcon} />
                                  </div>
                                </div>
                                <div>
                                  <span>Professional Hired: </span>
                                  <span>
                                    {project.hired && (
                                      <strong>{project.hired}</strong>
                                    )}
                                    {project.hired === null && (
                                      <strong>None</strong>
                                    )}
                                  </span>
                                  <div className=" circled">
                                    <ImageWrapper src={PencilIcon} />
                                  </div>
                                </div>
                              </div>
                            </Subsection>
                          </CardContent>
                        </Card>
                      </Grid.Column>
                    ))}
                  </ThreeColumn>
                </Subsection>
              </Subsection>
            </Section>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }
  fetchProjects() {
    const { consumerId } = this.props.user.LOAD_AUTH.data;
    if (consumerId !== -1) {
      this.props.dispatchAction({
        type: PROJECTS.LIST.REQUESTED,
        payload: {
          query: {
            consumer: consumerId,
          },
        },
      });
    }
  }
  componentDidMount() {
    this.fetchProjects();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {}

  getCategoryName = slug => {
    if (slug === undefined) {
      return '';
    }
    const result = slug
      .split('-')
      .map(
        string =>
          string.length > 0
            ? string[0].toUpperCase() + string.slice(1).toLowerCase()
            : string,
      )
      .join(' ');
    return result;
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withConnect,
)(ProjectsListPage);
// export default ProjectsListPage;
