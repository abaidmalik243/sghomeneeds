import React from 'react';
import { Image } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import SliderCircle from '../SliderCircle/index';
import './styles.css';

export default class GalleryDetailCarousel extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imageProps: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  changeDisplayImage = change => {
    const { images } = this.props;
    const { imageIndex } = this.state;
    this.setState({
      imageIndex:
        images.length > 0
          ? (imageIndex + change + images.length) % images.length
          : 0,
    });
  };
  render() {
    const {
      images,
      imageProps = {},
      width = '100%',
      height = 260,
      className = '',
    } = this.props;
    const { imageIndex } = this.state;
    return (
      <div className={`gallery-carousel ${className}`}>
        <div
          className="carousel-viewport"
          style={{ width: `${width}`, height: `${height}` }}
        >
          <div
            className="carousel-imagestrip"
            style={{
              position: 'relative',
              height: `${height}px`,
              left: `-${100 * imageIndex}%`,
            }}
          >
            {images.map(item => (
              <Image
                {...imageProps}
                style={{
                  width: `${width}`,
                  height: `${height}px`,
                  ...imageProps.style,
                }}
                key={v4()}
                className="carousel-single-image"
                src={item.src}
                alt={item.alt}
              />
            ))}
          </div>
          <button
            className="left-arrow"
            onClick={() => this.changeDisplayImage(-1)}
          >
            <i className="angle left icon" />
          </button>
          <button
            className="right-arrow"
            onClick={() => this.changeDisplayImage(1)}
          >
            <i className="angle right icon" />
          </button>
          <div className="detail-overlay" style={{}}>
            <p style={{ fontSize: '0.7em' }}>For:</p>
            <p style={{ fontSize: '1.2em' }}>
              {images[imageIndex] && images[imageIndex].address}
            </p>
            <p>
              Company:{' '}
              <strong>
                {images[imageIndex] && images[imageIndex].company}
              </strong>
            </p>
          </div>
          <div className="slider-circles-wrapper">
            <SliderCircle
              numDots={images.length}
              active={imageIndex}
              iconProps={{ style: { fontSize: 10 } }}
            />
          </div>
        </div>
      </div>
    );
  }
}
