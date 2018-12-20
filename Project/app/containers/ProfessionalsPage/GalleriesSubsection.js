import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
// import ImageWrapper from '../../components/Base/Image';
// import Section from '../../components/Section/Section';
// import SliderCircle from '../../components/SliderCircle';
// import CustomPagination from '../../components/CustomPagination';
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel';

/* eslint-disable react/prefer-stateless-function */
export default class GalleriesSubsection extends React.PureComponent {
  static propTypes = {
    galleries: PropTypes.object,
    // galleriesActivePage: PropTypes.number,
    // isPhone: PropTypes.bool,
  };
  state = {};
  render() {
    const { galleries } = this.props;
    return (
      <Subsection id="gallery">
        <h1 style={{ textAlign: 'left' }}>Gallery:</h1>
        <TwoColumn stackable>
          {galleries.results.map(gallery => (
            <Grid.Column key={v4()} computer={8} tablet={16} mobile={16}>
              <PaperWrapper className="paper" style={{ width: `${277}px` }}>
                <div className="gallery-single">
                  <GalleryCarousel
                    width={277}
                    height={260}
                    images={gallery.files.map(f => ({
                      src: f.file_field,
                      alt: f.name,
                    }))}
                  />
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
              </PaperWrapper>
            </Grid.Column>
          ))}
        </TwoColumn>
      </Subsection>
    );
  }
}
