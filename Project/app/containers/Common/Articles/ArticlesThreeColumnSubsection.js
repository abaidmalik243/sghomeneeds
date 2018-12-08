import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Section from '../../../components/Section/Section';
import ImageWrapper from '../../../components/Base/Image/index';
import Subsection from '../../../components/Section/Subsection';
import ThreeColumn from '../../../components/Section/ThreeColumn';
import PaperWrapper from '../../../components/Base/Paper';
import './styles.css';
/* eslint-disable react/prefer-stateless-function */
export default class ArticlesThreeColumnSubsection extends React.PureComponent {
  static propTypes = {
    articles: PropTypes.array,
  };
  render() {
    const { articles } = this.props;
    return (
      <Section>
        <Subsection>
          <h1>Our Articles:</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
          <ThreeColumn stackable>
            {articles.map(item => (
              <Grid.Column key={item.key} style={{ marginTop: '25px' }} className="article_box">
                <div className="new-article-label">New</div>
                <PaperWrapper
                  className="articles-paper"
                  style={{ borderRadius: '0px', paddingBottom: '30px' }}
                >
                  <ImageWrapper src={item.imageSource} />
                  <Subsection>
                    <h3>{item.title}</h3>
                    <p>{item.descriptionText}</p>
                  </Subsection>
                </PaperWrapper>
              </Grid.Column>
            ))}
          </ThreeColumn>
        </Subsection>
      </Section>
    );
  }
}
