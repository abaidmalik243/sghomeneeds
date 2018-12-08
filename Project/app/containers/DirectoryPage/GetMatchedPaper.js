import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper/index';
import SearchBar from '../../components/SearchBar';
import ThreeColumn from '../../components/Section/ThreeColumn';
import ImageWrapper from '../../components/Base/Image/index';
import Subsection from '../../components/Section/Subsection';

import Step1 from '../../images/DirectoryPage/step1.jpg';
import Step2 from '../../images/DirectoryPage/step2.jpg';
import Step3 from '../../images/DirectoryPage/step3.jpg';

function GetMatchedPaper(props) {
  return (
    <PaperWrapper id="get-matched-paper">
      <Subsection>
        <h2>Get matched to a professional within 60s</h2>
        <SearchBar
          placeholder="Keywords"
          onSubmit={props.onSearch}
          onChange={props.onSearchChange}
          fluid
        />
        <Container id="steps">
          <ThreeColumn>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step1} width="100%" />
                <h4>Step 1</h4>
              </Subsection>
            </Grid.Column>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step2} width="100%" />
                <h4>Step 2</h4>
              </Subsection>
            </Grid.Column>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step3} width="100%" />
                <h4>Step 3</h4>
              </Subsection>
            </Grid.Column>
          </ThreeColumn>
        </Container>
      </Subsection>
    </PaperWrapper>
  );
}

GetMatchedPaper.propTypes = {
  onSearch: PropTypes.func,
  onSearchChange: PropTypes.func,
};

export default GetMatchedPaper;
