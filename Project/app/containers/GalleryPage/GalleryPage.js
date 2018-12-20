import React from 'react';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import TemplatePage from '../Common/PageWrapper';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES, GALLERIES } from '../../actions/restApi';
import categorySaga from '../../sagas/category';
import gallerySaga from '../../sagas/gallery';
import { RESTART_ON_REMOUNT } from '../../utils/constants';
import './gallery-page.css';
// import LinkWrapper from '../../components/Base/Link';
import galleryReducer, { GALLERY_VIEW } from '../../reducers/gallery';
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel';
import GalleriesSearch from './GalleriesSearch';

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
  key: `${GALLERY_VIEW}`,
  saga: categorySaga,
  mode: RESTART_ON_REMOUNT,
});

const withGallerySaga = injectSaga({
  key: `${GALLERY_VIEW}`,
  saga: gallerySaga,
  mode: RESTART_ON_REMOUNT,
});

/* eslint-disable react/prefer-stateless-function */
class GalleryPage extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    [GALLERY_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func,
    galleries: PropTypes.array,
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

  fetchGalleries = query => {
    this.props.dispatchAction({
      type: GALLERIES.LIST.REQUESTED,
      payload: {
        query,
      },
    });
  };

  onApplyFilter = filter => {
    const { search, categories } = filter;
    const filterQuery = {};
    if (search) filterQuery.search = search;
    if (categories) filterQuery.categories = categories.join(',');
    this.fetchGalleries(filterQuery);
  };

  componentDidMount() {
    this.fetchCategories();
    // TODO: uncomment out when removing stub data
    this.fetchGalleries();
  }

  render() {
    const { galleries = {}, categories } = this.props[GALLERY_VIEW];

    const renderGallery = gallery => {
      const imagesData = gallery.files.map(file => ({
        src: file.file_field.substring(0, file.file_field.indexOf('?')),
        alt: file.name,
      }));
      return (
        <Grid.Column key={v4()} computer={5} tablet={8} mobile={16}>
          <div className="gallery-single">
            <GalleryCarousel width={277} images={imagesData} />
            <div
              className="gallery-single-text"
              style={{ width: '277px', margin: '8px auto' }}
            >
              <h4>{gallery.wp_post_title}</h4>
              <p>
                {gallery.property_type} - {gallery.estimated_project_cost}
              </p>
            </div>
          </div>
        </Grid.Column>
      );
    };

    return (
      <TemplatePage {...this.props}>
        <div className="galleries-page">
          <Grid className="galleries-grid" padded centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <GalleriesSearch
                  categoryOptions={categories.results}
                  onApplyFilter={this.onApplyFilter}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {galleries.results && galleries.results.length ? (
                galleries.results.map(gallery => renderGallery(gallery))
              ) : (
                <h2>No galleries found.</h2>
              )}
            </Grid.Row>
          </Grid>
        </div>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withCategorySaga,
  withGallerySaga,
  withConnect,
)(GalleryPage);
