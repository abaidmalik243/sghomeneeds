import React from 'react';
import PropTypes from 'prop-types';
import PaperWrapper from '../../components/Base/Paper';
import VideoPlayer from '../../components/Base/VideoPlayer';
import Subsection from '../../components/Section/Subsection';

/* eslint-disable react/prefer-stateless-function */
export default class VideoSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };
  render() {
    const { professional } = this.props;
    return (
      <Subsection id="video-section">
        <PaperWrapper id="video-paper">
          <div>
            <VideoPlayer videoSource={professional.video} />
          </div>
        </PaperWrapper>
      </Subsection>
    );
  }
}
