import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import TwoColumn from '../../../components/Section/TwoColumn';
import RatingStar from '../../../components/Base/RatingStar';
import Divider from '../../../components/Base/Divider';

/* eslint-disable react/prefer-stateless-function */
export default class ReviewSubPage extends React.PureComponent {
  static propTypes = {
    reviews: PropTypes.array,
    currentTab: PropTypes.string,
  };
  render() {
    const { currentTab, reviews } = this.props;
    return (
      <div style={{ display: currentTab === 'reviews' ? 'inherit' : 'none' }}>
        <TwoColumn>
          <Grid.Column>
            <Subsection style={{ textAlign: 'left' }}>
              <h3>Reviews</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection>
              {reviews.map(review => (
                <Card key={review.id}>
                  <CardContent>
                    <Subsection style={{ textAlign: 'left' }}>
                      <div style={{ display: 'inline-block' }}>
                        <h1>
                          {review.companyName}{' '}
                          <RatingStar defaultRating={5} maxRating={5} />
                        </h1>
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        <span> on {review.date}</span>
                      </div>
                      <p>{review.text}</p>
                    </Subsection>
                    <Divider />
                    <TwoColumn>
                      <Grid.Column>
                        <div style={{ textAlign: 'left' }}>{review.status}</div>
                      </Grid.Column>
                      <Grid.Column>
                        <button className="ui right floated button">
                          Request to Edit
                        </button>
                      </Grid.Column>
                    </TwoColumn>
                  </CardContent>
                </Card>
              ))}
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }
}
