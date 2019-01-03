/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import v4 from 'uuid/v4';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES, GALLERIES, LISTINGS } from '../../actions/restApi';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './styles.css';
import galleryReducer, { GALLERY_VIEW } from '../../reducers/gallery';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import ProfessionalsInfoCard from '../../containers/ProfessionalsPage/ProfessionalsInfoCard';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
import LinkWrapper from '../../components/Base/Link';
import ImageWrapper from '../../components/Base/Image';
import LocationIcon from '../../images/location-icon.png';
import CoinIcon from '../../images/coin-icon.png';
import Section from '../../components/Section/Section';
import ConnectProfessionalsSubsection from '../ProfessionalsPage/ConnectProfessionalsSubsection';
import GalleryDetailCarousel from '../../components/GalleryCarousel/GalleryDetailCarousel';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: GALLERY_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [GALLERY_VIEW]: state.get(GALLERY_VIEW).toJS(),
});
//
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: GALLERY_VIEW,
  reducer: galleryReducer,
});

const withCategorySaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});
const withListingsSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class GalleryDetailPage extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    [GALLERY_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func,
    goTo: PropTypes.func,
    match: PropTypes.object,
  };
  state = {
    aboutLength: 'short',
  };

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

  fetchGalleries = slug => {
    this.props.dispatchAction({
      type: GALLERIES.LIST.REQUESTED,
      payload: {
        query: {
          slug,
        },
      },
    });
  };
  fetchListing = id => {
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: {
        query: {
          id,
        },
      },
    });
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchGalleries(this.props.match.params.slug);
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps[GALLERY_VIEW][GALLERIES.MODEL].results.length > 0 &&
      this.props[GALLERY_VIEW][GALLERIES.MODEL].results.length > 0 &&
      prevProps[GALLERY_VIEW][GALLERIES.MODEL].results[0].id !==
        this.props[GALLERY_VIEW][GALLERIES.MODEL].results[0].id
    ) {
      this.fetchListing(
        this.props[GALLERY_VIEW][GALLERIES.MODEL].results[0].listing,
      );
    }
    if (
      prevProps[GALLERY_VIEW][GALLERIES.MODEL].results.length === 0 &&
      this.props[GALLERY_VIEW][GALLERIES.MODEL].results.length > 0
    ) {
      this.fetchListing(
        this.props[GALLERY_VIEW][GALLERIES.MODEL].results[0].listing,
      );
    }
  }

  render() {
    const { galleries, categories } = this.props[GALLERY_VIEW];
    const listing = this.props[GALLERY_VIEW][LISTINGS.MODEL].results[0];
    return (
      <TemplatePage {...this.props}>
        <Subsection id="gallery-detail-page">
          <TwoColumn>
            <Grid.Column width={10}>

              {galleries &&
                galleries.count &&
                galleries.count === 1 && (
                <Section>
                  <Subsection>
                    <PaperWrapper>
                      <Subsection>
                        <div className="gallery-title">
                          <h1>
                            {galleries.results[0].wp_post_title}
                            <span style={{ color: 'orange' }}>!</span>
                          </h1>
                          <FavoriteButton
                            buttonProps={{ className: 'gallery-favourite' }}
                            iconProps={{}}
                          />
                        </div>
                        <div className="gallery-about">
                          <h3>About:</h3>
                          <div>
                            {galleries.results[0].about_rich_text.length <
                                500 &&
                                renderHTML(
                                  galleries.results[0].about_rich_text,
                                )}
                            {galleries.results[0].about_rich_text.length >=
                                500 &&
                                this.state.aboutLength === 'short' &&
                                `${renderHTML(
                                  galleries.results[0].about_rich_text.slice(
                                    0,
                                    500,
                                  ),
                                )}...`}
                            {galleries.results[0].about_rich_text.length >=
                                500 &&
                                this.state.aboutLength === 'long' &&
                                renderHTML(
                                  galleries.results[0].about_rich_text,
                                )}
                          </div>
                          <LinkWrapper
                            href="#"
                            onClick={this.toggleAboutLength}
                          >
                            {galleries.results[0].about_rich_text.length >=
                                500 &&
                                (this.state.aboutLength === 'short'
                                  ? 'View More'
                                  : 'View Less')}
                          </LinkWrapper>
                        </div>
                      </Subsection>
                      <Section className="gallery-info-extension">
                        <TwoColumn>
                          <Grid.Column>
                            <Subsection>
                              <div className="info-label">
                                <ImageWrapper src={LocationIcon} />
                                <span>Location:</span>
                              </div>
                            </Subsection>
                          </Grid.Column>
                          <Grid.Column>
                            <Subsection>
                              <span>
                                <strong>
                                  {galleries.results[0].address}
                                </strong>
                              </span>
                            </Subsection>
                          </Grid.Column>
                        </TwoColumn>
                      </Section>
                      <Section className="gallery-info-extension last-row">
                        <TwoColumn>
                          <Grid.Column>
                            <Subsection>
                              <div className="info-label">
                                <ImageWrapper src={CoinIcon} />
                                <span>Estimate Cost:</span>
                              </div>
                            </Subsection>
                          </Grid.Column>
                          <Grid.Column>
                            <Subsection>
                              <span>
                                <strong>
                                  {
                                    galleries.results[0]
                                      .estimated_project_cost
                                  }
                                </strong>
                              </span>
                            </Subsection>
                          </Grid.Column>
                        </TwoColumn>
                      </Section>
                    </PaperWrapper>
                  </Subsection>
                  {galleries.results[0].files.filter(
                    file => file.is_gallery_before_images,
                  ).length > 0 && (
                    <Subsection className="gallery-photos">
                      <h2>Before Photos:</h2>
                      <GalleryDetailCarousel
                        images={galleries.results[0].files
                          .filter(file => file.is_gallery_before_images)
                          .map(file => ({
                            src: file.file_field,
                            alt: v4(),
                            address: galleries.results[0].address,
                            company: listing && listing.name,
                          }))}
                      />
                    </Subsection>
                  )}
                  {galleries.results[0].files.filter(
                    file => !file.is_gallery_before_images,
                  ).length > 0 && (
                    <Subsection className="gallery-photos">
                      <h2>After Photos:</h2>
                      <GalleryDetailCarousel
                        images={galleries.results[0].files
                          .filter(file => !file.is_gallery_before_images)
                          .map(file => ({
                            src: file.file_field,
                            alt: v4(),
                            address: galleries.results[0].address,
                            company: listing && listing.name,
                          }))}
                      />
                    </Subsection>
                  )}
                </Section>
              )}
              {!(galleries && galleries.count && galleries.count === 1) && (
                <Subsection>
                  <PaperWrapper>
                    <Subsection>
                      <h1>Gallery Not Found!</h1>
                    </Subsection>
                  </PaperWrapper>
                </Subsection>
              )}
            </Grid.Column>
            <Grid.Column width={6}>
              {listing && (
                <Subsection>
                  <ProfessionalsInfoCard
                    professional={listing}
                    view="gallery"
                    goTo={this.props.goTo}
                    categories={categories}
                  />
                  <div id="report-listing">
                    <div style={{ cursor: 'pointer' }}>
                      <i className="icon flag" />
                      Report this listing
                    </div>
                  </div>
                </Subsection>
              )}
              {listing && <ConnectProfessionalsSubsection {...this.props} />}
            </Grid.Column>
          </TwoColumn>
        </Subsection>
      </TemplatePage>
    );
  }
  toggleAboutLength = () => {
    this.setState({
      aboutLength: this.state.aboutLength === 'long' ? 'short' : 'long',
    });
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withCategorySaga,
  withGallerySaga,
  withListingsSaga,
  withConnect,
)(GalleryDetailPage);
