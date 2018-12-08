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

import './company-list.css';

function CompanyCard(props) {
  return (
    <Card className="company-card">
      <CardContent>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className="logo-wrapper">
                <Link href to={`/professionals/${props.company.slug}`}>
                  <ImageWrapper
                    src={props.company.logo}
                    height="150px"
                    width="228px"
                    style={{
                      objectFit: 'contain',
                      borderRadius: '5px',
                    }}
                  />
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div style={{ textAlign: 'left' }}>
                <FavoriteButton
                  buttonProps={{
                    style: {
                      float: 'right',
                      boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                      marginLeft: '4px',
                    },
                  }}
                  iconProps={{}}
                />
                <Link href to={`/professionals/${props.company.slug}`}>
                  <h3>{props.company.name}</h3>
                </Link>
                <p>{props.company.default_categories}</p>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <div style={{ marginBottom: '20px' }}>
                <ChatNowButton iconProps={{}} buttonProps={{}} />
              </div>
              <div>
                <RatingStar size="huge" maxRating={5} defaultRating={5} />
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
};

export default CompanyCard;
