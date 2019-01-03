/* eslint-disable prettier/prettier */
import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { Grid, Modal, Form } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';

import RatingStar from '../../components/Base/RatingStar';
import ImageWrapper from '../../components/Base/Image';
import PaperWrapper from '../../components/Base/Paper';
import './styles.css';
import Section from '../../components/Section/Section';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import CustomPagination from '../../components/CustomPagination';
import Avatar from '../../images/avatar-placeholder.png'
import ButtonWrapper from '../../components/Base/Button';
import { REVIEWS } from '../../actions/restApi';

const PER_PAGE = 3

/* eslint-disable react/prefer-stateless-function */
export default class ReviewsSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    reviews: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
  };
  state = {
    reviewsActivePage: 1,
    newRating: 0,
    openReviewModal: false,
    newComment: '',
  };
  render() {
    const { reviews, user, professional } = this.props;
    const { reviewsActivePage, newRating, openReviewModal, newComment } = this.state;
    const shownResults = reviews ? reviews.results.slice((reviewsActivePage - 1) * PER_PAGE, reviewsActivePage * PER_PAGE) : []
    return (
      <Subsection id="reviews">
        <PaperWrapper className="paper">
          <Section>
            <div className="inline" style={{ color: 'gray' }}>
              <h2>({reviews.count})</h2>
            </div>
            <div className="inline">
              <h1>Reviews:</h1>
            </div>
            <div className="inline">
              {reviews.count === 0 && (
                <RatingStar
                  disabled
                  maxRating={5}
                  defaultRating={0}
                  size="huge"
                />
              )}
              {reviews.count > 0 && (
                <RatingStar
                  disabled
                  maxRating={5}
                  defaultRating={reviews.results
                    .map(review => review.rating)
                    .reduce((a, b) => a + b, 0) / reviews.count}
                  size="huge"
                />
              )}
            </div>
            {user.LOAD_AUTH.data.consumerId && user.LOAD_AUTH.data.consumerId !== -1 && (
              <div className="inline">
                <Modal
                  trigger={
                    <ButtonWrapper design="filled" onClick={() =>{this.setState({openReviewModal: true})}}>New Review</ButtonWrapper>
                  }
                  open={openReviewModal}
                  onClose={()=> {this.setState({openReviewModal:false})}}
                  size="mini"
                >
                  <Subsection>
                    <h1>Create Review</h1>
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        const data = new FormData(e.target)
                        this.props.dispatchAction({
                          type: REVIEWS.POST.REQUESTED,
                          payload: {
                            data,
                          },
                        });
                        this.setState({openReviewModal: false, newRating: 0, newComment: ''})
                      }}>
                      <RatingStar
                        maxRating={5}
                        defaultRating={0}
                        size="huge"
                        onRate={(e,d) => {this.setState({ newRating: d.rating })}}
                      />
                      <input type="hidden" name="rating" value={newRating} />
                      <input type="hidden" name="commenter_name" value={user.user.long_first_name} />
                      <input type="hidden" name="user" value={user.user.id} />
                      <input type="hidden" name="commenter_email" value={user.user.email} />
                      <input type="hidden" name="listing_name" value={professional.name} />
                      <input type="hidden" name="listing" value={professional.id} />
                      <h4>Comment</h4>
                      <textarea
                        name="comment"
                        value={newComment}
                        onChange={(e) => {
                          this.setState({newComment: e.target.value})
                        }}
                      />
                      <ButtonWrapper design="filled" type="submit">Submit</ButtonWrapper>
                    </Form>
                  </Subsection>
                </Modal>
              </div>
            )}
          </Section>
          {/* <Subsection className="review-factors"> */}
          {/* <TwoColumn stackable={false}> */}
          {/* {Array.from(Array(4).keys()).map(i => ( */}
          {/* <Grid.Column key={i}> */}
          {/* <div style={{ margin: '10px 0px' }}> */}
          {/* <h2 className="factor-label"> */}
          {/* {reviews.factors[i].label}{' '} */}
          {/* <RatingStar */}
          {/* maxRating={5} */}
          {/* defaultRating={professional.reviews.factors[i].rating} */}
          {/* size="huge" */}
          {/* /> */}
          {/* </h2> */}
          {/* </div> */}
          {/* </Grid.Column> */}
          {/* ))} */}
          {/* </TwoColumn> */}
          {/* </Subsection> */}
          {shownResults.map(item => (
            <Subsection key={v4()} className="single-review">
              <TwoColumn stackable={false}>
                <Grid.Column width={3}>
                  <ImageWrapper
                    src={Avatar}
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
                            <h3>{item.commenter_name}</h3>
                          </div>
                          <div className="inline">|</div>
                          <div className="inline">
                            <h4 style={{ color: 'gray' }}>{new Date(item.date).toDateString()}</h4>
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
                  <div className="review-text">{renderHTML(item.comment)}</div>
                </Grid.Column>
              </TwoColumn>
            </Subsection>
          ))}
          {reviews.count > 0 && (
            <Subsection style={{ padding: '30px' }}>
              <CustomPagination
                activePage={reviewsActivePage}
                totalPages={reviews.count/PER_PAGE}
                onPageChange={(e,d) => {this.setState({reviewsActivePage: d.activePage})}}
              />
            </Subsection>
          )}
        </PaperWrapper>
      </Subsection>
    );
  }
}
