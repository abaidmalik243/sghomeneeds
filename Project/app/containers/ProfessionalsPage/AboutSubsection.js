import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';

/* eslint-disable react/prefer-stateless-function */
export default class AboutSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };
  render() {
    const { professional } = this.props;
    return (
      <Subsection id="about-us-section">
        <PaperWrapper className="paper">
          <Subsection style={{ padding: '20px' }}>
            <div
              style={{
                textAlign: 'left',
                fontSize: 'initial',
                fontWeight: 200,
                lineHeight: '1.5em',
              }}
            >
              <h1>About Us:</h1>
              {professional.loading
                ? 'Loading'
                : renderHTML(professional.about_rich_text)}
            </div>
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
}
