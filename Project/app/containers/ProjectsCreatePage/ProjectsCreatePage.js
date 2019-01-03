/* eslint-disable no-underscore-dangle */
import React from 'react';
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

import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS } from '../../actions/restApi';

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
class ProjectsCreatePage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 991px)">
          {isNotComputer => (
            <Section>
              <Subsection style={{ padding: 0 }}>
                <h1>PROJECTS CREATE</h1>
                {isNotComputer}
              </Subsection>
            </Section>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }
  componentDidMount() {
    if (this.props.user.LOAD_AUTH.data.consumerId !== -1) {
      const formData = localStorage.getItem('form');
      // console.log(this.props.user.LOAD_AUTH.data.consumerId)
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          data: {
            form_data: formData,
            consumer: this.props.user.LOAD_AUTH.data.consumerId,
          },
        },
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (
      prevProps.user.LOAD_AUTH.data.consumerId !==
      this.props.user.LOAD_AUTH.data.consumerId
    ) {
      const formData = localStorage.getItem('form');
      // console.log(this.props.user.LOAD_AUTH.data.consumerId)
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          data: {
            form_data: formData,
            consumer: this.props.user.LOAD_AUTH.data.consumerId,
          },
        },
      });
    }
    if (
      prevProps[PROJECT_VIEW][PROJECTS.MODEL].POST.id !==
      this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.id
    ) {
      this.props.goTo({
        path: `/dashboard/projects/select?project=${
          this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.id
        }`,
      });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withConnect,
)(ProjectsCreatePage);
// export default ProjectsCreatePage;
