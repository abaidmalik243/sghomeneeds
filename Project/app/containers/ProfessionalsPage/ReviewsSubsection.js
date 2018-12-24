import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';

import RatingStar from '../../components/Base/RatingStar';
import ImageWrapper from '../../components/Base/Image';
import PaperWrapper from '../../components/Base/Paper';
import './styles.css';
import Section from '../../components/Section/Section';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import CustomPagination from '../../components/CustomPagination';

/* eslint-disable react/prefer-stateless-function */
export default class ReviewsSubsection extends React.PureComponent {
  state = {
    totalPages: 5,
  }

  componentDidMount() {
    const isMobile = window.innerWidth <= 500;
    if (isMobile) {
      this.setState({
        totalPages: 3,
      })
    }
  }

  static propTypes = {
    professional: PropTypes.object,
    reviewsActivePage: PropTypes.number,
  };
  render() {
    const { professional, reviewsActivePage } = this.props;
    return (
      <Subsection id="reviews">
        <PaperWrapper className="paper">
          <Section>
            <div className="inline" style={{ color: 'gray' }}>
              <h2>({professional.reviews.count})</h2>
            </div>
            <div className="inline">
              <h1>Reviews:</h1>
            </div>
            <div className="inline">
              <RatingStar
                maxRating={5}
                defaultRating={professional.reviews.rating}
                size="huge"
              />
            </div>
          </Section>
          <Subsection className="review-factors">
            <TwoColumn stackable={false}>
              {Array.from(Array(4).keys()).map(i => (
                <Grid.Column key={i}>
                  <div style={{ margin: '10px 0px' }}>
                    <h2 className="factor-label">
                      {professional.reviews.factors[i].label}{' '}
                      <RatingStar
                        maxRating={5}
                        defaultRating={professional.reviews.factors[i].rating}
                        size="huge"
                      />
                    </h2>
                  </div>
                </Grid.Column>
              ))}
            </TwoColumn>
          </Subsection>
          {professional.reviews.list.map(item => (
            <Subsection key={item.key} className="single-review">
              <TwoColumn stackable={false}>
                <Grid.Column width={3}>
                  <ImageWrapper
                    src={item.imageSource}
                    rounded
                    style={{ width: '70px', margin: 'auto' }}
                  />
                </Grid.Column>
                <Grid.Column width={13}>
                  <div>
                    <TwoColumn stackable={false}>
                      <Grid.Column width={13}>
                        <div style={{ textAlign: 'left' }}>
                          <div className="inline">
                            <h3>{item.name}</h3>
                          </div>
                          <div className="inline">|</div>
                          <div className="inline">
                            <h4 style={{ color: 'gray' }}>{item.date}</h4>
                          </div>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <div
                          style={{
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <VerifiedIcon style={{ marginRight: '10px' }} />
                          <i
                            className="flag icon"
                            style={{
                              position: 'relative',
                              top: '-2px',
                              color: 'rgba(0, 0, 0, 0.6)',
                            }}
                          />
                        </div>
                      </Grid.Column>
                    </TwoColumn>
                  </div>
                  <div className="review-text">{item.text}</div>
                </Grid.Column>
              </TwoColumn>
            </Subsection>
          ))}
          <Subsection style={{ padding: '30px' }}>
            <CustomPagination activePage={reviewsActivePage} totalPages={this.state.totalPages} />
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
}
