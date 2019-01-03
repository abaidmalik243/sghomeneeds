/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { generateText } from '../../../utils/loremIpsumGenerator';
// import { companies } from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import CompanyList from '../../../components/CompanyList';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import { FAVOURITES } from '../../../actions/restApi';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';

/* eslint-disable react/prefer-stateless-function */
export default class FavouritesSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    const favourites = this.props[DASHBOARD_VIEW][FAVOURITES.MODEL].LIST;
    const companies = {
      results: favourites.results
        ? favourites.results
          .filter(favourite => favourite.listing !== null)
          .map(favourite => favourite.listing)
        : [],
    };
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Favourites"
        tabLink="favourites"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {companies.results.length > 0 && <CompanyList
            companies={companies}
            dispatchAction={this.props.dispatchAction}
            user={this.props.user} />}
          {companies.results.length === 0 && <p>No Favourites Found</p>}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  componentDidMount() {
    this.props.dispatchAction({
      type: FAVOURITES.LIST.REQUESTED,
      payload: {
        query: {
          consumer: this.props.user.LOAD_AUTH.data.consumerId,
        },
      },
    });
  }
  // componentDidUpdate(prevProps,prevState,snapshot) {
  //   if (prevProps[DASHBOARD_VIEW][FAVOURITE.MODEL].LIST.results !== this.props[DASHBOARD_VIEW][FAVOURITE.MODEL].LIST.results) {
  //
  //   }
  // }
}
