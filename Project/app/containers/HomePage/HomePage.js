import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import TemplatePage from '../Common/PageWrapper';
import Section from '../../components/Section/Section';
import {
  categories,
  howItWorks,
  homeProjects,
  differenceList,
  clientReviews,
} from './content';
import BannerSection from './BannerSection';
import CategorySection from './CategorySection';
import HowItWorksSection from './HowItWorksSection';
import BrowseHomeProjectsSection from './BrowseHomeProjectsSection';
import HowDifferentSection from './HowDifferentSection';
import ClientReviewsSection from './ClientReviewsSection';
import ArticlesThreeColumnSubsection from '../Common/Articles/ArticlesThreeColumnSubsection';

import './homepage.css';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };
  render() {
    return (
      <MediaQuery query="(max-width: 700px)">
        {isPhone => (
          <div id="homepage">
            <TemplatePage {...this.props}>
              <BannerSection isPhone={isPhone} {...this.props} />
              <CategorySection
                categories={categories}
                search={this.search}
                {...this.props}
              />
              <HowItWorksSection howItWorks={howItWorks} {...this.props} />
              <BrowseHomeProjectsSection
                homeProjects={homeProjects}
                {...this.props}
              />
              <HowDifferentSection
                differenceList={differenceList}
                {...this.props}
              />
              <ClientReviewsSection
                clientReviews={clientReviews}
                {...this.props}
              />
              <Section id="home-articles">
                <ArticlesThreeColumnSubsection {...this.props} />
              </Section>
            </TemplatePage>
          </div>
        )}
      </MediaQuery>
    );
  }

  search = query => {
    const search = queryString.stringify({
      search: query,
    });
    const target = `/directory?${search}`;
    this.props.history.push(target);
  };
}
export default HomePage;
