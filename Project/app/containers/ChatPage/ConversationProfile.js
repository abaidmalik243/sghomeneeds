/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './conversation-profile.css';
import Avatar from '../../components/Base/Avatar';
import RatingStar from '../../components/Base/RatingStar';

/* eslint-disable react/prefer-stateless-function */
export default class ConversationProfile extends React.PureComponent {
  static propTypes = {
    listing: PropTypes.object,
    handleHire: PropTypes.func,
  };

  render() {
    const { listing } = this.props;
    // TODO: Remove when profile is connected to store
    if (!listing) return null;
    return (
      <div className="conversation-profile">
        <Avatar src={listing.logo} size={70} />
        <h3 style={{ margin: '12px' }}>{listing.name}</h3>
        <div className="review-wrapper">
          Review: <RatingStar maxRating={5} defaultRating={4} /> (80)
        </div>
        <div className="info-row">
          <div>
            <Icon className="mail" />Email
          </div>
          <div>{listing.email}</div>
        </div>
        <div className="info-row">
          <div>
            <Icon className="phone" />Phone Number
          </div>
          <div>{listing.phone}</div>
        </div>
        <div className="info-row">
          <div>
            <Icon className="clock outline" />Response Time
          </div>
          <div>Instant</div>
        </div>
        <button
          className="hire-pro"
          onClick={() => {
            this.props.handleHire(listing.id);
          }}
        >
          <Icon className="male" />Hire Pro for Project!
        </button>
      </div>
    );
  }
}
