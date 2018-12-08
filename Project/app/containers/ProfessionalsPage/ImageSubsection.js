import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import ImageWrapper from '../../components/Base/Image';
import FiveColumn from '../../components/Section/FiveColumn';
import NavButton from '../../components/CustomButton/NavButton';

/* eslint-disable react/prefer-stateless-function */
export default class ImageSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };
  render() {
    const { professional } = this.props;
    return (
      <div>
        {professional.images.length > 0 && (
          <Subsection id="images-section">
            <PaperWrapper className="paper">
              <Subsection>
                <div style={{ textAlign: 'left', padding: '20px' }}>
                  <div>
                    <NavButton
                      buttonProps={{
                        style: {
                          float: 'right',
                          margin: '0px 10px',
                          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                        },
                      }}
                      iconProps={{ className: 'right' }}
                    />
                    <NavButton
                      buttonProps={{
                        style: {
                          float: 'right',
                          margin: '0px 10px',
                          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                        },
                      }}
                      iconProps={{ className: 'left' }}
                    />
                    <h1 style={{ marginBottom: '40px' }}>Images:</h1>
                  </div>
                  <ImageWrapper
                    src={professional.images[0].imageSource}
                    alt={professional.images[0].alt}
                  />
                </div>
                <Subsection>
                  {Array.from(
                    Array(Math.ceil(professional.images.length / 5)).keys(),
                  ).map(row => (
                    <FiveColumn stackable key={row}>
                      {professional.images
                        .slice(row * 5, row * 5 + 5)
                        .map(item => (
                          <Grid.Column key={item.key}>
                            <ImageWrapper
                              src={item.imageSource}
                              alt={item.alt}
                            />
                          </Grid.Column>
                        ))}
                    </FiveColumn>
                  ))}
                </Subsection>
              </Subsection>
            </PaperWrapper>
          </Subsection>
        )}
      </div>
    );
  }
}
