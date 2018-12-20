import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import ImageWrapper from '../Base/Image';
import Card from '../Base/Card/Card';
import CardContent from '../Base/Card/CardContent';
import RatingStar from '../Base/RatingStar';
import FavoriteButton from '../CustomButton/FavoriteButton';
import ChatNowButton from '../CustomButton/ChatNowButton';
import { getS3Image } from '../../utils/images';

function CompanyCard(props) {
  const { company, onSelect, selected, selectable, goTo } = props;
  return (
    <Card
      {...props}
      className={`company-card ${selectable &&
        selected.indexOf(company.id) !== -1 &&
        'selected'}`}
      onClick={() => {
        onSelect(company);
      }}
    >
      <CardContent>
        <Grid columns={3} stackable container>
          <Grid.Row>
            <Grid.Column width={4}>
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
                  {!company.logo && (
                    <div className="orange-circle">
                      <ImageWrapper
                        src={getS3Image(
                          '/images/ProfessionalsPage/listing.png',
                        )}
                        style={{
                          objectFit: 'contain',
                          borderRadius: '5px',
                        }}
                      />
                    </div>
                  )}
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={8}
              tablet={7}
              style={{ padding: '16px 8px' }}
            >
              <div style={{ textAlign: 'left' }}>
                <FavoriteButton
                  buttonProps={{
                    style: {
                      float: 'right',
                      boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                      marginLeft: '4px',
                      display: selectable ? 'none' : 'inherit',
                    },
                  }}
                  iconProps={{}}
                />
                <Link
                  href
                  to={selectable ? '#' : `/professionals/${company.slug}`}
                >
                  <h3>{company.name}</h3>
                </Link>
                <p>{company.default_categories}</p>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={4}
              tablet={5}
              style={{ padding: '16px 8px' }}
            >
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
              <div>
                <RatingStar
                  size="huge"
                  maxRating={5}
                  defaultRating={5}
                  disabled
                />
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
};

export default CompanyCard;
