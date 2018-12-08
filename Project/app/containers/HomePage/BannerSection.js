import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import PaperWrapper from '../../components/Base/Paper';
import SearchBar from '../../components/SearchBar';
import Banner from '../../images/HomePage/banner.jpg';

import ImageBannerSection from '../../components/Section/ImageBannerSection';
import Subsection from '../../components/Section/Subsection';

import '../../components/ButtonGroup/styles.css';
import './styles.css';

/* eslint-disable react/prefer-stateless-function */
export default class BannerSection extends React.PureComponent {
  static propTypes = {
    isPhone: PropTypes.bool,
    history: PropTypes.object,
  };
  render() {
    const { isPhone, history } = this.props;
    return (
      <ImageBannerSection
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
                // width="300px"
                fluid
                history={history}
                inputStyle={{ paddingLeft: "30px" }}
                // buttonStyle={{ paddingRight: '30px', paddingLeft: '30px' }}
                // style= {{paddingLeft50}}
              />
            </div>
            <div id="search-bottom-link">
              <a className="gray underline" href="/#">
                Search for A Specific Professional
              </a>
            </div>
          </Subsection>
        </PaperWrapper>
      </ImageBannerSection>
    );
  }
}
