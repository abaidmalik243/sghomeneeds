import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import { merchant as professional, listing as defaultListing } from './content';
import Subsection from '../../components/Section/Subsection';
import ProfessionalsInfoCard from './ProfessionalsInfoCard';
import VideoSubsection from './VideoSubsection';
import AboutSubsection from './AboutSubsection';
import ImageSubsection from './ImageSubsection';
import TemplatePage from '../Common/PageWrapper';
import GalleriesSubsection from './GalleriesSubsection';
import ArticlesTwoColumnSubsection from '../Common/Articles/ArticlesTwoColumnSubsection';
import ReviewsSubsection from './ReviewsSubsection';
import { LISTINGS } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import SearchBar from '../../components/SearchBar';
import { orange } from '../../components/Base/constants';
import ImageWrapper from '../../components/Base/Image';
import ReliableProBadge from '../../images/ProfessionalsPage/reliable-pro-badge.jpg';
import Listing from '../../images/ProfessionalsPage/listing.png';
import { generateText } from '../../utils/loremIpsumGenerator';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import professionalsReducer from '../../reducers/professionals';
import FaqSubsection from './FaqSubsection';

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
const withSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ProfessionalsPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    [PROFESSIONALS_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };
  render() {
    let listing = this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET;
    if (listing === undefined) {
      listing = defaultListing;
    }
    const verifiedJsx = (
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <VerifiedIcon /> &nbsp; <span style={{ color: '#bbb' }}>Verified</span>
      </div>
    );

    return (
      <TemplatePage {...this.props}>
        <Subsection id="professionals">
          <TwoColumn>
            <Grid.Column width={9}>
              <Subsection id="name">
                <PaperWrapper className="paper">
                  <Subsection>
                    <h1>{listing.name}</h1>
                    {/* {listing.is_verified ? verifiedJsx : null} */}
                    {verifiedJsx}
                  </Subsection>
                </PaperWrapper>
              </Subsection>
              <VideoSubsection professional={professional} />
              <AboutSubsection professional={listing} />
              <ImageSubsection professional={professional} />
              <GalleriesSubsection
                professional={professional}
                galleriesActivePage={3}
              />
              <hr style={{ background: '#ddd', height: '1px', border: 0 }} />
              <ArticlesTwoColumnSubsection
                professional={professional}
                articalesActivePage={2}
              />
              <FaqSubsection professional={professional} faqActivePage={1} />
              <ReviewsSubsection
                professional={professional}
                reviewsActivePage={1}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Subsection id="professionals-info">
                <ProfessionalsInfoCard professional={listing} />
                <div
                  id="report-listing"
                  style={{ float: 'right', cursor: 'pointer' }}
                >
                  <i className="icon flag" />
                  Report this listing
                </div>
              </Subsection>
              <Subsection>
                <PaperWrapper
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom right, rgb(255, 177, 0), rgb(255, 120, 0)',
                  }}
                >
                  <Subsection>
                    <div style={{ textAlign: 'left', padding: '10px' }}>
                      <h2 style={{ color: '#fff' }}>
                        CONNECT TO THE FEW PROFESSIONAL IN 60S!
                      </h2>
                      <SearchBar placeholder="Keywords" {...this.props} fluid />
                    </div>
                  </Subsection>
                </PaperWrapper>
              </Subsection>
              <Subsection>
                <PaperWrapper>
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
                      <p>{generateText(200)}</p>
                    </div>
                  </Subsection>
                </PaperWrapper>
              </Subsection>
              <Subsection>
                <PaperWrapper>
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
    );
  }
  componentWillMount() {
    const id = this.props.location.pathname.split('/')[2];
    this.props.dispatchAction({
      type: LISTINGS.GET.REQUESTED,
      payload: { id },
    });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(ProfessionalsPage);
