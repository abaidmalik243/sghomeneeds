import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import RatingStar from '../../../components/Base/RatingStar';
import Divider from '../../../components/Base/Divider';
import './styles.css';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';

/* eslint-disable react/prefer-stateless-function */
export default class ReviewSubPage extends React.PureComponent {
  static propTypes = {
    reviews: PropTypes.array,
    currentTab: PropTypes.string,
  };
  render() {
    const { currentTab, reviews } = this.props;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Reviews"
        tabLink="reviews"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {reviews.map(review => (
            <Card className="review-card" key={review.id}>
              <CardContent>
                <div className="review-card-header">
                  <div>
                    <h3>{review.companyName}</h3>
                    <RatingStar defaultRating={5} maxRating={5} />
                    <span className="review-card-date"> on {review.date}</span>
                  </div>
                  <div className="review-card-content">
                    <p>{review.text}</p>
                  </div>
                </div>
                <Divider />
                <div className="review-card-footer">
                  <div
                    className={`review-card-status-${review.status.toLowerCase()}`}
                  >
                    {review.status}
                  </div>
                  <div className="review-card-edit">
                    <button className="ui button">
                      <Icon className="ui edit" /> Request to Edit
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
}
