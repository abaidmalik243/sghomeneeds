import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import PaperWrapper from '../../components/Base/Paper/index';
import SearchBar from '../../components/SearchBar/index';
// import Banner from '../../images/HomePage/banner.jpg';

import HomePageImageBannerSection from '../../components/Section/HomePageImageBannerSection';
import Subsection from '../../components/Section/Subsection';

import '../../components/ButtonGroup/styles.css';
import './styles.css';
import { getS3Image } from '../../utils/images';

const Banner = getS3Image('/images/HomePage/banner.jpg');

/* eslint-disable react/prefer-stateless-function */
export default class BannerSection extends React.PureComponent {
  static propTypes = {
    isPhone: PropTypes.bool,
    history: PropTypes.object,
  };
  render() {
    const { isPhone, history } = this.props;
    return (
      <HomePageImageBannerSection
        imageSource={Banner}
        style={{ marginBottom: isPhone ? '150px' : '100px' }}
      >
        <PaperWrapper id="banner-paper" className="mybanner_paper">
          <Subsection className="search_heading">
            <h1>Connecting You to Reliable SG Home Professionals</h1>
            <h3 className="gray font-size-18" style={{ marginBottom: '35px' }}>
              Your trusted Home Advisor
            </h3>
            <div style={{ margin: '10px auto', width: '77%' }}>
              <SearchBar
                placeholder="What service do you need?"
                fluid
                history={history}
                inputStyle={{ paddingLeft: '30px' }}
              />
            </div>
            <div id="search-bottom-link">
              <a className="gray underline" href="/#">
                Search for A Specific Professional
              </a>
            </div>
          </Subsection>
        </PaperWrapper>
      </HomePageImageBannerSection>
    );
  }
}
