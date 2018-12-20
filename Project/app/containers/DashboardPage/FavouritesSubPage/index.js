import React from 'react';
import PropTypes from 'prop-types';
import { generateText } from '../../../utils/loremIpsumGenerator';
import { companies } from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import CompanyList from '../../../components/CompanyList';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';

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
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Favourites"
        tabLink="favourites"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          <CompanyList companies={{ results: companies }} />
        </SubPageContent>
      </SubPageWrapper>
    );
  }
}
