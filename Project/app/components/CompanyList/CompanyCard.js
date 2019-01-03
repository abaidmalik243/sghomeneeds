/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import ImageWrapper from '../Base/Image';
import Card from '../Base/Card/Card';
import CardContent from '../Base/Card/CardContent';
import RatingStar from '../Base/RatingStar';
import FavoriteButton from '../CustomButton/FavoriteButton';
import ChatNowButton from '../CustomButton/ChatNowButton';
import { CONSUMERS } from '../../actions/restApi';
// import { getS3Image } from '../../utils/images';
// import logoPlaceholder from '../../images/logo-placeholder.png';

function CompanyCard(props) {
  const {
    company,
    onSelect,
    selected,
    selectable,
    goTo,
    user,
    dispatchAction,
  } = props;
  return (
    <Card
      {...props}
      className={`company-card ${selectable &&
        selected.indexOf(company.id) !== -1 &&
        'selected'}`}
      onClick={() => {
        if (onSelect) {
          onSelect(company);
        }
      }}
    >
      <CardContent>
        <Grid columns={3} stackable container>
          <Grid.Row>
            <Grid.Column width={company.logo ? 4 : 0}>
              <div className="logo-wrapper">
                <Link
                  href
                  to={selectable ? '#' : `/professionals/${company.slug}`}
                >
                  {company.logo && (
                    <ImageWrapper
                      src={company.logo}
                      height="150px"
                      width="228px"
                      style={{
                        objectFit: 'contain',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={company.logo ? 8 : 12}
              tablet={company.logo ? 7 : 11}
              style={{ padding: '16px 8px' }}
            >
              <div style={{ textAlign: 'left' }}>
                {user.isLoggedIn &&
                  user[CONSUMERS.MODEL] &&
                  user[CONSUMERS.MODEL].favourite_listings && (
                  <FavoriteButton
                    buttonProps={{
                      style: {
                        float: 'right',
                        boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                        marginLeft: '4px',
                        display: selectable ? 'none' : 'inherit',
                      },
                      onClick: () => {
                        dispatchAction({
                          type: CONSUMERS.POST.REQUESTED,
                          payload: {
                            id: user[CONSUMERS.MODEL].id,
                            url: 'favourite',
                            data: {
                              listing_slug: company.slug,
                            },
                          },
                        });
                      },
                    }}
                    iconProps={{}}
                    isFavourite={user[CONSUMERS.MODEL].favourite_listings && user[CONSUMERS.MODEL].favourite_listings.indexOf(company.slug) !== -1}
                  />
                )}
                <Link
                  href
                  to={selectable ? '#' : `/professionals/${company.slug}`}
                >
                  <h3>{company.name}</h3>
                </Link>
                <p>
                  {renderHTML(`${company.about_rich_text.slice(0, 80)}...`)}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={4}
              tablet={5}
              style={{ padding: '16px 8px' }}
            >
              {company.chat_activated && (
                <div style={{ marginBottom: '20px' }}>
                  <ChatNowButton
                    buttonProps={{
                      fluid: 'true',
                      display: selectable ? 'none' : 'inherit',
                    }}
                    onClick={() => {
                      goTo(encodeURI(`/dashboard/chat?listing=${company.id}`));
                    }}
                  />
                </div>
              )}
              <div>
                {company.reviews.length === 0 && (
                  <RatingStar
                    size="huge"
                    maxRating={5}
                    defaultRating={0}
                    disabled
                  />
                )}
                {company.reviews.length > 0 && (
                  <RatingStar
                    size="huge"
                    maxRating={5}
                    defaultRating={
                      company.reviews
                        .map(r => r.rating)
                        .reduce((a, b) => a + b, 0) / company.reviews.length
                    }
                    disabled
                  />
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </CardContent>
    </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
  selectable: PropTypes.bool,
  goTo: PropTypes.func,
  user: PropTypes.object,
  dispatchAction: PropTypes.func,
};

export default CompanyCard;
