/* eslint-disable prettier/prettier */
import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import CardContent from '../../components/Base/Card/CardContent';
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
import ButtonWrapper from '../../components/Base/Button';
import UserIcon from '../../images/user-icon.png';
import LinkWrapper from '../../components/Base/Link';
import { CONSUMERS } from '../../actions/restApi';

/* eslint-disable react/prefer-stateless-function */
export default class ProfessionalsInfoCard extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    view: PropTypes.string,
    goTo: PropTypes.func,
    categories: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
  };
  render() {
    const { professional, view } = this.props;
    const attributes = [
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
      <Card>
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
              {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.consumerId !== null && (
                <FavoriteButton
                  buttonProps={{ style: { float: 'right' }, onClick: () => {
                    this.props.dispatchAction({
                      type: CONSUMERS.POST.REQUESTED,
                      payload: {
                        url: 'favourite',
                        id: this.props.user.LOAD_AUTH.data.consumerId,
                        data: {
                          listing_slug: professional.slug,
                        },
                      },
                    })
                  } }}
                  iconProps={{}}
                  isFavourite={this.props.user[CONSUMERS.MODEL].favourite_listings && this.props.user[CONSUMERS.MODEL].favourite_listings.indexOf(professional.slug) !== -1}
                />
              )}
            </Grid.Column>
          </TwoColumn>
          {professional.logo ? (
            <OneColumn>
              <Grid.Column>
                <ImageWrapper src={professional.logo} width="33%" />
              </Grid.Column>
            </OneColumn>
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
              {((professional.reviews && professional.reviews.length === 0) ||
                professional.reviews === undefined) && (
                <RatingStar
                  size="huge"
                  maxRating={5}
                  defaultRating={0}
                  disabled
                />
              )}
              {professional.reviews &&
                professional.reviews.length > 0 && (
                <RatingStar
                  size="huge"
                  maxRating={5}
                  defaultRating={
                    professional.reviews
                      .map(r => r.rating)
                      .reduce((a, b) => a + b, 0) /
                      professional.reviews.length
                  }
                  disabled
                />
              )}
            </div>
            <div className="inline">
              <h3
                style={{
                  fontWeight: 'normal',
                  color: 'gray',
                  fontSize: '12px',
                }}
              >
                ({professional.reviews ? professional.reviews.length : 0})
              </h3>
            </div>
          </OneColumn>
          <TwoColumn>
            <Grid.Column>
              {view === 'professionals' && (
                <div id="online-wrapper">
                  <i className="icon small circle" />
                  {professional.chat_activated && (<h3 id="online">Online</h3>)}
                </div>
              )}
              {view === 'gallery' && (
                <div id="view-profile-wrapper">
                  <ButtonWrapper
                    design="outline"
                    onClick={() => {
                      this.props.goTo({
                        path: `/professionals/${professional.slug}`,
                      });
                    }}
                  >
                    <ImageWrapper src={UserIcon} height="14px" />
                    {' | '}View Profile
                  </ButtonWrapper>
                </div>
              )}
            </Grid.Column>
            <Grid.Column>
              {professional.chat_activated && (
                <div id="chatnow-wrapper">
                  <ChatNowButton buttonProps={{ style: { padding: '11px 0' } }} />
                </div>
              )}
            </Grid.Column>
          </TwoColumn>
        </CardContent>
        <CardContent className="services-content">
          <span>Services: </span>
          {professional.categories &&
            professional.categories.length > 0 &&
            professional.categories.map(c => {
              const category = this.getCategory(c)
              return (
                <div style={{display: 'inline'}}>
                  {category && (
                    <LinkWrapper key={v4()}  href={`/services/${category.slug}`}>
                      <Label color="rgb(225, 225, 225)">
                        {renderHTML(category.name)}
                      </Label>
                    </LinkWrapper>
                  )}
                </div>
              )
            }
            )}
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
  getCategory = categoryId => this.props.categories.results.filter(c => c.id === categoryId)[0]
}
