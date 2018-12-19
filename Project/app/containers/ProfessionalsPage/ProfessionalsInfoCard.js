import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import CardContent from '../../components/Base/Card/CardContent';
import ThreeColumn from '../../components/Section/ThreeColumn';
import IconWrapper from '../../components/Base/Icon';
import ImageWrapper from '../../components/Base/Image';
import OneColumn from '../../components/Section/OneColumn';
import RatingStar from '../../components/Base/RatingStar';
import TwoColumn from '../../components/Section/TwoColumn';
import Label from '../../components/Base/Label';
import Card from '../../components/Base/Card/Card';
import './styles.css';
import ChatNowButton from '../../components/CustomButton/ChatNowButton';
import Section from '../../components/Section/Section';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';

/* eslint-disable react/prefer-stateless-function */
export default class ProfessionalsInfoCard extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };
  render() {
    const { professional } = this.props;
    const attributes = [
      {
        attribute: 'Average Response Time',
        value: '1Hrs',
        icon: 'stopwatch',
        key: '1',
      },
      {
        attribute: 'Phone Number',
        value: professional.phone,
        icon: 'phone',
        key: '2',
      },
      {
        attribute: 'Address',
        value: professional.address,
        icon: 'map marker alternate',
        key: '3',
      },
      {
        attribute: 'Opening Hours',
        value: professional.timing,
        icon: 'clock',
        key: '4',
      },
      {
        attribute: 'Website',
        value: professional.website,
        icon: 'globe',
        key: '5',
      },
      {
        attribute: 'Email',
        value: professional.email,
        icon: 'envelope outline',
        key: '6',
      },
    ];
    return (
      <Card style={{}}>
        <CardContent>
          <TwoColumn stackable={false}>
            <Grid.Column>
              <button
                className="ui circular facebook icon button"
                style={{ float: 'left' }}
              >
                <i className="facebook icon" />
              </button>
              <button
                className="ui circular linkedin icon button"
                style={{ float: 'left' }}
              >
                <i className="linkedin icon" />
              </button>
              <button
                className="ui circular instagram icon button"
                style={{ float: 'left' }}
              >
                <i className="instagram icon" />
              </button>
            </Grid.Column>
            <Grid.Column>
              <FavoriteButton
                buttonProps={{ style: { float: 'right' } }}
                iconProps={{}}
              />
            </Grid.Column>
          </TwoColumn>
          {professional.logo ? (
            <ThreeColumn>
              <Grid.Column />
              <Grid.Column>
                <ImageWrapper src={professional.logo} />
              </Grid.Column>
              <Grid.Column />
            </ThreeColumn>
          ) : null}
          <OneColumn>
            <h2 style={{ fontWeight: 'normal', fontSize: '18px' }}>
              {professional.name}
            </h2>
            <div className="inline">
              <h3
                style={{
                  fontWeight: 'normal',
                  fontSize: '12px',
                  color: 'rgb(75, 75, 75)',
                }}
              >
                Review:
              </h3>
            </div>
            <div className="inline">
              <RatingStar defaultRating={4} maxRating={5} />
            </div>
            <div className="inline">
              <h3
                style={{
                  fontWeight: 'normal',
                  color: 'gray',
                  fontSize: '12px',
                }}
              >
                (100)
              </h3>
            </div>
          </OneColumn>
          <TwoColumn>
            <Grid.Column>
              <div id="online-wrapper">
                <i className="icon small circle" />
                <h3 id="online">Online</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div id="chatnow-wrapper">
                <ChatNowButton
                  buttonProps={{ style: { padding: '11px 0' } }}
                  iconProps={{}}
                />
              </div>
            </Grid.Column>
          </TwoColumn>
        </CardContent>
        <CardContent className="services-content">
          <span>Services: </span>
          {professional.cateogries_text.split(',').map(item => (
            <Label key={item} color="rgb(225, 225, 225)">
              {renderHTML(item)}
            </Label>
          ))}
        </CardContent>
        {attributes.map(item => (
          <CardContent key={item.key}>
            <Section style={{ padding: '10px' }}>
              <TwoColumn stackable={false}>
                <Grid.Column
                  className="attribute-name"
                  width={8}
                  style={{ textAlign: 'left' }}
                >
                  <IconWrapper name={item.icon} /> <span>{item.attribute}</span>
                </Grid.Column>
                <Grid.Column
                  width={8}
                  style={{ textAlign: 'left', overflowWrap: 'break-word' }}
                >
                  <p style={{ fontWeight: 600 }}>{item.value}</p>
                </Grid.Column>
              </TwoColumn>
            </Section>
          </CardContent>
        ))}
      </Card>
    );
  }
}