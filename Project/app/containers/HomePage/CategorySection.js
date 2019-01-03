import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper/index';
import Subsection from '../../components/Section/Subsection';
import Section from '../../components/Section/Section';
import LinkWrapper from '../../components/Base/Link/index';
import './category.css';
import { getS3Image } from '../../utils/images';

const dots = getS3Image('/images/HomePage/dots.png');
const houseImage = getS3Image('/images/new-images/001-house.png');
const carpentersImage = getS3Image('/images/new-images/002-wood.png');
const handyImage = getS3Image('/images/new-images/003-tools.png');
const pestcontrolImage = getS3Image('/images/new-images/004-bug.png');
const airconditionerImage = getS3Image(
  '/images/new-images/005-air-conditioner.png',
);

/* eslint-disable react/prefer-stateless-function */

export default class CategorySection extends React.PureComponent {
  static propTypes = {
    // categories: PropTypes.array,
    // search: PropTypes.func,
    goTo: PropTypes.func,
  };

  renderImage(image) {
    if (image === 'Pest Control') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px">
          <image
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            xlinkHref="data:img/png;base64,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"
          />
        </svg>
      );
    }
    if (image === 'Handyman') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px">
          <image
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            xlinkHref="data:img/png;base64,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"
          />
        </svg>
      );
    }
    if (image === 'Carpenters') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46px" height="40px">
          <image
            x="0px"
            y="0px"
            width="46px"
            height="40px"
            xlinkHref="data:img/png;base64,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"
          />
        </svg>
      );
    }
    if (image === 'Home') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px">
          <image
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            xlinkHref="data:img/png;base64,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"
          />
        </svg>
      );
    }

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="40px">
        <image
          x="0px"
          y="0px"
          width="72px"
          height="40px"
          xlinkHref="data:img/png;base64,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"
        />
      </svg>
    );
  }

  renderShape() {
    return (
      <svg
        className="shape"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 265 279"
        width="188"
        height="198"
      >
        <path
          fillRule="evenodd"
          fill="rgba(255, 177, 0, 0.071)"
          d="M10.236,176.579 C-20.881,52.430 22.052,-5.416 148.893,0.502 C280.657,6.649 302.203,72.262 202.694,194.703 C104.750,315.219 41.951,303.117 10.236,176.579 Z"
        />
      </svg>
    );
  }

  render() {
    return (
      <Section style={{ backgroundColor: 'white', marginTop: '0px' }}>
        <div id="dotted-line">{this.renderShape()}</div>
        <Subsection style={{ width: '77%' }}>
          <PaperWrapper id="category-paper">
            <Grid
              columns={6}
              doubling
              style={{ marginRight: 0, marginLeft: 0 }}
            >
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button
                      className="category-button"
                      onClick={() => {
                        this.props.goTo({ path: '/services/home-designing' });
                      }}
                    >
                      <img src={houseImage} width="40px" height="40px" alt="" />
                      <h4>Home</h4>
                    </button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button
                      className="category-button"
                      onClick={() => {
                        this.props.goTo({ path: '/services/carpentry' });
                      }}
                    >
                      <img
                        src={carpentersImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <h4>Carpenters</h4>
                    </button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button
                      className="category-button"
                      onClick={() => {
                        this.props.goTo({ path: '/services/handyman' });
                      }}
                    >
                      <img src={handyImage} width="40px" height="40px" alt="" />
                      <h4>HandyMan</h4>
                    </button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button
                      className="category-button"
                      onClick={() => {
                        this.props.goTo({ path: '/services/pest-control' });
                      }}
                    >
                      <img
                        src={pestcontrolImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <h4>Pest Control</h4>
                    </button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button
                      className="category-button"
                      onClick={() => {
                        this.props.goTo({ path: '/services/airconditioning' });
                      }}
                    >
                      <img
                        src={airconditionerImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <h4>Air Conditioner</h4>
                    </button>
                  </div>
                </Grid.Column>

                <Grid.Column id="view-all">
                  <LinkWrapper className="category-button " href="/services">
                    <div id="category-button-content">
                      <Image src={dots} />
                      <h4>View All</h4>
                    </div>
                  </LinkWrapper>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </PaperWrapper>
        </Subsection>
      </Section>
    );
  }
}
