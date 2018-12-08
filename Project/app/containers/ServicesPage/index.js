import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import { categories } from './data';

import ThreeColumn from '../../components/Section/ThreeColumn';
import TemplatePage from '../Common/PageWrapper';
import ImageBannerSection from '../../components/Section/ImageBannerSection';
import Section from '../../components/Section/Section';
import SearchBar from '../../components/SearchBar';

import banner from '../../images/ServicesPage/apartment-architecture-carpet-584399.png';
import Subsection from '../../components/Section/Subsection';
import './services-page.css';
import PaperWrapper from '../../components/Base/Paper';

const parent = [];
const sub = [];
categories.forEach(e => {
  if (parent.indexOf(e.parent) === -1) {
    parent.push(e.parent);
    sub.push([e.name]);
  } else {
    sub[parent.indexOf(e.parent)].push(e.name);
  }
});

/* eslint-disable react/prefer-stateless-function */
export default class ServicesPage extends React.PureComponent {
  renderCategories() {
    return (
      <ThreeColumn>
        {parent.map((p, i) => (
          <Grid.Column key={v4()}>
            <h2>{p}</h2>
            {sub[i].map(s => (
              <p>
                <a key={v4()} href={`/directory/?search=${p}`}>
                  {s}
                </a>
              </p>
            ))}
          </Grid.Column>
        ))}
      </ThreeColumn>
    );
  }

  render() {
    return (
      <TemplatePage>
        <ImageBannerSection imageSource={banner}>
          <Subsection className="banner-title">
            <h1>Home!</h1>
            <h3>
              Complete your home improvement projects with right professionals
            </h3>
            <SearchBar />
          </Subsection>
        </ImageBannerSection>
        <Subsection>
          <h1>Popular Home Services</h1>
          <ThreeColumn>
            {parent.map(p => (
              <Grid.Column key={v4()}>
                <PaperWrapper className="paper popular">
                  <Image src="http://via.placeholder.com/100x100" />
                  <h2>{p}</h2>
                </PaperWrapper>
              </Grid.Column>
            ))}
          </ThreeColumn>
        </Subsection>
        <Section>{this.renderCategories()}</Section>
      </TemplatePage>
    );
  }
}
