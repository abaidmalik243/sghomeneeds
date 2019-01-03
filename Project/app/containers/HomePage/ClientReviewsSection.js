import React from 'react';
// import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Grid } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import ImageWrapper from '../../components/Base/Image/index';
import Subsection from '../../components/Section/Subsection';
import ThreeColumn from '../../components/Section/ThreeColumn';
import Card from '../../components/Base/Card/Card';
import CardContent from '../../components/Base/Card/CardContent';
import CardHeader from '../../components/Base/Card/CardHeader';
// import ButtonWrapper from '../../components/Base/Button/index';
import Label from '../../components/Base/Label/index';
import { orange } from '../../components/Base/constants';

import './client-review.css';
import SliderCircle from '../../components/SliderCircle';
import { reviews } from './content';
import Avatar from '../../images/avatar-placeholder.png';

/* eslint-disable react/prefer-stateless-function */
export default class ClientReviewsSection extends React.PureComponent {
  static propTypes = {
    // clientReviews: PropTypes.array,
  };
  state = {
    activePage: 0,
  };
  render() {
    // const { clientReviews } = this.props;
    const { activePage } = this.state;
    return (
      <Section id="client-review">
        <Subsection style={{ width: '90%' }}>
          <h1 style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            Our Client Reviews:
          </h1>
          <ThreeColumn stackable>
            {reviews.results
              .slice(activePage * 3, (activePage + 1) * 3)
              .map(review => (
                <Grid.Column key={v4()}>
                  <div style={{ width: '90%', margin: 'auto' }}>
                    <div style={{ height: '25px' }}>
                      <ImageWrapper
                        className="client-review-image"
                        rounded
                        src={Avatar}
                        style={{}}
                      />
                    </div>
                    <Card>
                      <CardHeader>
                        <h4>{review.commenter_name}</h4>
                      </CardHeader>
                      <CardContent>
                        <Grid columns={2} divided>
                          <Grid.Row>
                            <Grid.Column width={9}>
                              <span className="attr">Company: </span>
                              <span className="attr-value">
                                {review.listing_name}
                              </span>
                            </Grid.Column>
                            <Grid.Column width={7}>
                              <span className="attr">Type: </span>
                              <Label color={orange}>
                                {review.category_name}
                              </Label>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </CardContent>
                      <CardContent className="review-text">
                        {review.comment}
                      </CardContent>
                    </Card>
                  </div>
                </Grid.Column>
              ))}
          </ThreeColumn>
          <div className="slider-circle-wrapper">
            <SliderCircle
              numDots={2}
              active={activePage}
              iconProps={{}}
              onClick={index => {
                this.setState({ activePage: index });
              }}
            />
          </div>
          {/* <div> */}
          {/* <ButtonWrapper design="filled">View All</ButtonWrapper> */}
          {/* </div> */}
        </Subsection>
      </Section>
    );
  }
}
