import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import ImageWrapper from '../../components/Base/Image';
import Section from '../../components/Section/Section';
import SliderCircle from '../../components/SliderCircle';
import CustomPagination from '../../components/CustomPagination';

/* eslint-disable react/prefer-stateless-function */
export default class GalleriesSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    galleriesActivePage: PropTypes.number,
  };
  render() {
    const { professional, galleriesActivePage } = this.props;
    return (
      <Subsection id="gallery">
        <h1 style={{ textAlign: 'left' }}>Gallery:</h1>
        <TwoColumn stackable>
          {professional.galleries.map(item => (
            <Grid.Column key={item.key}>
              <PaperWrapper className="paper">
                <Section>
                  <ImageWrapper src={item.imageSource} alt={item.alt} />
                  <div className="left-arrow">
                    <i className="angle left icon" />
                  </div>
                  <div className="right-arrow">
                    <i className="angle right icon" />
                  </div>
                  <div className="slider-circle-wrapper">
                    <SliderCircle
                      numDots={4}
                      active={2}
                      iconProps={{ style: { fontSize: 10 } }}
                    />
                  </div>
                </Section>
                <Subsection style={{ margin: 'auto' }}>
                  <h3 style={{ textAlign: 'left', fontWeight: 'normal' }}>
                    {item.name}
                  </h3>
                </Subsection>
              </PaperWrapper>
            </Grid.Column>
          ))}
        </TwoColumn>
        <div style={{ margin: '10px 0 0' }}>
          <CustomPagination activePage={galleriesActivePage} totalPages={5} />
        </div>
      </Subsection>
    );
  }
}
