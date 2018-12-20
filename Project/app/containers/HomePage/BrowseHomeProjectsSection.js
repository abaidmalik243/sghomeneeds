import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import Section from '../../components/Section/Section';
import Card from '../../components/Base/Card/Card';
import CardHeader from '../../components/Base/Card/CardHeader';
import CardImage from '../../components/Base/Card/CardImage';

import './browse-home.css';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
import SliderCircle from '../../components/SliderCircle';

/* eslint-disable react/prefer-stateless-function */
export default class BrowseHomeProjectsSection extends React.PureComponent {
  static propTypes = {
    homeProjects: PropTypes.array,
  };
  render() {
    const { homeProjects } = this.props;
    return (
      <Section id="browse-home">
        <div id="shape-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 477 376"
            width="338px"
            height="267px"
          >
            <path
              fillRule="evenodd"
              fill="rgba(255, 177, 0, 0.071)"
              d="M75.891,109.304 C207.548,-41.440 320.042,-37.917 425.417,130.266 C534.882,304.978 469.846,391.194 224.040,372.650 C-17.900,354.397 -58.297,262.944 75.891,109.304 Z"
            />
          </svg>
        </div>
        <Subsection>
          <h1 className="section-title">Browse Home Project:</h1>
          <h4 className="gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut
          </h4>
          <Subsection>
            <Menu id="selector" widths={4} borderless>
              <a href="/#" className="item active">
                <div className="menu-item">Interior Design</div>
              </a>
              <a href="/#" className="item">
                <div className="menu-item">Cleaner</div>
              </a>

              <a href="/#" className="item">
                <div className="menu-item">Carpentary</div>
              </a>
              <a href="/#" className="item">
                <div className="menu-item">Pest Cleaner</div>
              </a>
            </Menu>
          </Subsection>
          <Subsection style={{ width: '87%' }}>
            <Grid columns={3} stackable>
              <Grid.Row>
                {homeProjects.map(item => (
                  <Grid.Column key={item.key}>
                    <Card style={{ boxShadow: 'none' }}>
                      <CardImage source={item.imageSource} />
                      <div className="favourite-wrapper">
                        <FavoriteButton
                          buttonProps={{ className: 'favourite' }}
                          iconProps={{}}
                        />
                      </div>
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
                          iconProps={{ style: { fontSize: '8px' } }}
                        />
                      </div>
                      <CardHeader>
                        <div className="project-text-wrapper">
                          <h1 className="project-title">{item.title}</h1>
                          <h3 className="project-subtitle">Condo・S$40,000</h3>
                        </div>
                      </CardHeader>
                    </Card>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
            <div className="projects-slider">
              <SliderCircle
                numDots={4}
                active={2}
                iconProps={{ style: { fontSize: '12px' } }}
              />
            </div>
          </Subsection>
        </Subsection>
      </Section>
    );
  }
}
