import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import TwoColumn from '../../../components/Section/TwoColumn';
// import { LISTINGS } from '../../../actions/restApi';
import { comments } from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import PaperWrapper from '../../../components/Base/Paper';
import edit from '../../../images/DashboardPage/edit.png';

/* eslint-disable react/prefer-stateless-function */
export default class CommentsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    // dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    // user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    return (
      <div style={{ display: currentTab === 'comments' ? 'inherit' : 'none' }}>
        <TwoColumn>
          <Grid.Column>
            <Subsection className="dashboard-sub-page-title">
              <h3>Comments:</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            {comments.map(item => (
              <PaperWrapper className="paper">
                <Subsection>
                  <h2>{item.postName}</h2>
                  <span>{`On: ${item.date}`}</span>
                  <p>{item.text}</p>
                  <hr />
                  <span>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src={edit} /> Request To Edit
                  </span>
                </Subsection>
              </PaperWrapper>
            ))}
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }
}
