import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import TwoColumn from '../../../components/Section/TwoColumn';
import { companies } from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import CompanyList from '../../../components/CompanyList';

/* eslint-disable react/prefer-stateless-function */
export default class FavouritesSubPage extends React.PureComponent {
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
              <h3>Favourites:</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <CompanyList companies={companies} />
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }
}
