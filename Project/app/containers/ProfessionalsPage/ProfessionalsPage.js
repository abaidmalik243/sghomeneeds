/* eslint-disable prettier/prettier */
import React from 'react';
import MediaQuery from 'react-responsive';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import { listing as defaultListing } from './content';
import Subsection from '../../components/Section/Subsection';
import ProfessionalsInfoCard from './ProfessionalsInfoCard';
import VideoSubsection from './VideoSubsection';
import AboutSubsection from './AboutSubsection';
import ImageSubsection from './ImageSubsection';
import TemplatePage from '../Common/PageWrapper';
import GalleriesSubsection from './GalleriesSubsection';
// import ArticlesTwoColumnSubsection from '../Common/Articles/ArticlesTwoColumnSubsection';
import ReviewsSubsection from './ReviewsSubsection';
import { LISTINGS, FILES, GALLERIES, REVIEWS, CATEGORIES } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import { orange } from '../../components/Base/constants';
import ImageWrapper from '../../components/Base/Image';
import { generateText } from '../../utils/loremIpsumGenerator';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import professionalsReducer from '../../reducers/professionals';
import FaqSubsection from './FaqSubsection';
import { getS3Image } from '../../utils/images';
import ConnectProfessionalsSubsection from './ConnectProfessionalsSubsection';
// import { WP_POSTS } from '../../actions/wpApi';


const ReliableProBadge = getS3Image(
  '/images/ProfessionalsPage/reliable-pro-badge.jpg',
);
const Listing = getS3Image('/images/ProfessionalsPage/listing.png');

export const PROFESSIONALS_VIEW = 'professionals';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: PROFESSIONALS_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [PROFESSIONALS_VIEW]: state.get(PROFESSIONALS_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: PROFESSIONALS_VIEW,
  reducer: professionalsReducer,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});
const withFileSaga = injectSaga({
  key: FILES.MODEL,
  saga: saga(FILES),
  mode: DAEMON,
});
const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});
const withReviewsSaga = injectSaga({
  key: REVIEWS.MODEL,
  saga: saga(REVIEWS),
  mode: DAEMON,
});
const withCategoriesSaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});


/* eslint-disable react/prefer-stateless-function */
class ProfessionalsPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    [PROFESSIONALS_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    user: PropTypes.object,
  };
  render() {
    const {goTo} = this.props;
    let listing = this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET;
    if (listing === undefined) {
      listing = defaultListing;
    }
    const images = this.props[PROFESSIONALS_VIEW][FILES.MODEL].LIST;
    const galleries = this.props[PROFESSIONALS_VIEW][GALLERIES.MODEL].LIST;
    // const articles = this.props[PROFESSIONALS_VIEW][WP_POSTS.MODEL].LIST;
    const verifiedJsx = (
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <VerifiedIcon /> &nbsp; <span style={{ color: '#bbb' }}>Verified</span>
      </div>
    );
    const categories = this.props[PROFESSIONALS_VIEW][CATEGORIES.MODEL].LIST;
    return (
      <MediaQuery query="(max-width: 768px)">
        {isPhone => (
          <TemplatePage {...this.props}>
            <Subsection id="professionals">
              <TwoColumn>
                <Grid.Column width={9}>
                  <Subsection id="name">
                    <PaperWrapper className="paper">
                      <Subsection>
                        <h1>{listing.name}</h1>
                        {listing.is_verified && verifiedJsx}
                        {/* {verifiedJsx} */}
                      </Subsection>
                    </PaperWrapper>
                  </Subsection>
                  {listing &&
                    listing.video_embed_code && <VideoSubsection professional={listing} />}
                  <AboutSubsection professional={listing} />
                  {images &&
                    images.results &&
                    images.results.length > 0 && (
                    <ImageSubsection images={images} />
                  )}
                  {galleries &&
                    galleries.results &&
                    galleries.results.length > 0 && (
                    <GalleriesSubsection
                      galleries={galleries}
                      isPhone={isPhone}
                      goTo={goTo}
                    />
                  )}
                  <hr
                    style={{ background: '#ddd', height: '1px', border: 0 }}
                  />
                  {/* <ArticlesTwoColumnSubsection /> */}
                  {listing &&
                    listing.faq_data &&
                    listing.faq_data.items &&
                    listing.faq_data.items.length > 0 && (
                    <FaqSubsection professional={listing} />
                  )}
                  <ReviewsSubsection
                    professional={listing}
                    reviews={this.props[PROFESSIONALS_VIEW][REVIEWS.MODEL].LIST}
                    user={this.props.user}
                    dispatchAction={this.props.dispatchAction}
                  />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Subsection id="professionals-info">
                    <ProfessionalsInfoCard dispatchAction={this.props.dispatchAction} user={this.props.user} professional={listing} view="professionals" goTo={this.props.goTo} categories={categories}/>
                    <div id="report-listing">
                      <div style={{ cursor: 'pointer' }}>
                        <i className="icon flag" />
                        Report this listing
                      </div>
                    </div>
                  </Subsection>
                  <ConnectProfessionalsSubsection {...this.props} />
                  {listing.best_pros_badge && (
                    <Subsection>
                      <PaperWrapper className="paper">
                        <Subsection style={{ padding: '10px' }}>
                          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>
                            Reliable Pro Badge:
                          </h1>
                          <Subsection>
                            <ImageWrapper
                              style={{ display: 'inline-block' }}
                              src={ReliableProBadge}
                            />
                          </Subsection>
                          <div
                            style={{
                              backgroundColor: '#eee',
                              textAlign: 'left',
                              margin: '10px',
                              padding: '20px',
                            }}
                          >
                          </div>
                        </Subsection>
                      </PaperWrapper>
                    </Subsection>
                  )}
                  <Subsection>
                    <PaperWrapper className="paper">
                      <Subsection style={{ padding: '10px' }}>
                        <h1 style={{ textAlign: 'left', marginTop: '20px' }}>
                          Place This Listing on your Site!
                        </h1>
                        <Subsection>
                          <div
                            style={{
                              backgroundColor: orange,
                              padding: '33px',
                              borderRadius: '62px',
                              width: '124px',
                              display: 'inline-block',
                            }}
                          >
                            <ImageWrapper
                              style={{ display: 'inline-block' }}
                              src={Listing}
                            />
                          </div>
                        </Subsection>
                        <div
                          style={{
                            backgroundColor: '#eee',
                            textAlign: 'left',
                            margin: '10px',
                            padding: '20px',
                          }}
                        >
                          <p>{generateText(200)}</p>
                        </div>
                      </Subsection>
                    </PaperWrapper>
                  </Subsection>
                </Grid.Column>
              </TwoColumn>
            </Subsection>
          </TemplatePage>
        )}
      </MediaQuery>
    );
  }
  fetchCategories = () => {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: {
        query: {
          limit: 300,
        },
        showSpinner: false,
      },
    });
  };

  componentDidMount() {
    const id = this.props.location.pathname.split('/')[2];
    this.props.dispatchAction({
      type: LISTINGS.GET.REQUESTED,
      payload: { id },
    });
    this.props.dispatchAction({
      type: REVIEWS.LIST.REQUESTED,
      payload: {
        query: {
          listing: id,
          limit: 200,
        },
      },
    });
    this.fetchCategories()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id !==
      prevProps[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id
    ) {
      this.props.dispatchAction({
        type: FILES.LIST.REQUESTED,
        payload: {
          query: {
            listing: this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id,
          },
        },
      });
      this.props.dispatchAction({
        type: GALLERIES.LIST.REQUESTED,
        payload: {
          query: {
            listing: this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id,
          },
        },
      });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withListingSaga,
  withFileSaga,
  withGallerySaga,
  withReviewsSaga,
  withCategoriesSaga,
  // withBlogSaga,
  withConnect,
)(ProfessionalsPage);
