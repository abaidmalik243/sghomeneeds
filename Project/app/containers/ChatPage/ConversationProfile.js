/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Icon } from 'semantic-ui-react';
// import PropTypes from 'prop-types';

import './conversation-profile.css';
import Avatar from '../../components/Base/Avatar';
import RatingStar from '../../components/Base/RatingStar';
import LinkWrapper from '../../components/Base/Link';

/* eslint-disable react/prefer-stateless-function */
export default class ConversationProfile extends React.PureComponent {
  static propTypes = {
    // profile: PropTypes.object,
  };

  render() {
    // const { profile } = this.props;
    // TODO: Remove when profile is connected to store
    const profile = {
      avatar:
        'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png',
      name: 'SGHomeNeedsAdmin',
      review: '',
      email: 'sghomeneeds.dev@gmail.com',
      phoneNumber: '+1-234-5678',
      responseTime: '1 Hr',
      hireLink: 'google.com',
    };

    if (!profile) return null;

    return (
      <div className="conversation-profile">
        <Avatar src={profile.avatar} size={70} />
        <h3 style={{ margin: '12px' }}>{profile.name}</h3>
        <div className="review-wrapper">
          Review: <RatingStar maxRating={5} defaultRating={4} /> (80)
        </div>
        <div className="info-row">
          <div>
            <Icon className="mail" />Email
          </div>
          <div>{profile.email}</div>
        </div>
        <div className="info-row">
          <div>
            <Icon className="phone" />Phone Number
          </div>
          <div>{profile.phoneNumber}</div>
        </div>
        <div className="info-row">
          <div>
            <Icon className="clock outline" />Response Time
          </div>
          <div>{profile.responseTime}</div>
        </div>
        <LinkWrapper href={profile.hireLink}>
          <div className="hire-pro">
            <Icon className="male" />Hire Pro for Project!
          </div>
        </LinkWrapper>
      </div>
    );
  }
}
