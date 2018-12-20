import React from 'react';
import PropTypes from 'prop-types';
import { Grid, List } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import ImageWrapper from '../../components/Base/Image/index';

import Subsection from '../../components/Section/Subsection';

import './how-different.css';
import { getS3Image } from '../../utils/images';

const Phone = getS3Image('/images/HomePage/Iphone-X-SGHomeNeeds.png');
const Tick = getS3Image('/images/HomePage/tick.jpg');

/* eslint-disable react/prefer-stateless-function */
export default class HowDifferentSection extends React.PureComponent {
  static propTypes = {
    differenceList: PropTypes.array,
  };
  render() {
    const { differenceList } = this.props;
    return (
      <Section id="how-different">
        <Subsection>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={10} style={{ margin: 'auto' }}>
                <h1>How We Are Different?</h1>
                <List>
                  {differenceList.map(item => (
                    <List.Item key={item.key} style={{ margin: '10px 0px' }}>
                      <ImageWrapper src={Tick} height="40px" width="40px" />
                      <List.Content>
                        <p className="gray">{item.text}</p>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
              <Grid.Column width={6}>
                <ImageWrapper
                  src={Phone}
                  style={{ float: 'right', height: '550px' }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Subsection>
      </Section>
    );
  }
}
