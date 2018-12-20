import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TwoColumn from '../../../components/Section/TwoColumn';
import Subsection from '../../../components/Section/Subsection';
import OneColumn from '../../../components/Section/OneColumn';
import Divider from '../../../components/Base/Divider';
import PaperWrapper from '../../../components/Base/Paper';
import ButtonWrapper from '../../../components/Base/Button';
import './styles.css';
import ListingModal from './ListingModal';
import {
  CATEGORIES,
  GALLERIES,
  LISTINGS,
  USERS,
} from '../../../actions/restApi';
import Avatar from '../../../components/Base/Avatar';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import GalleryModal from './GalleryModal';
import FilesModal from './FilesModal';

/* eslint-disable react/prefer-stateless-function */
export default class ProfilePaper extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    currentTab: PropTypes.string,
    history: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };

  render() {
    const { profile, currentTab, user } = this.props;

    const dashboardTabs = [
      {
        name: 'Account Settings',
        link: 'account',
      },
      {
        name: 'Notification Settings',
        link: 'notifications',
      },
      {
        name: 'Favourites',
        link: 'favourites',
      },
      {
        name: 'Listings & Galleries',
        link: 'listings',
      },
      {
        name: 'Reviews',
        link: 'reviews',
      },
      {
        name: 'Comments',
        link: 'comments',
      },
    ];
    const dashboardTabJsx = dashboardTabs
      .filter(tab => {
        if (tab.link === 'listings') {
          return (
            user.LOAD_AUTH.data.merchantId !== null &&
            user.LOAD_AUTH.data.merchantId !== -1
          );
        }
        return true;
      })
      .map(item => (
        <a
          className={`item ${currentTab === item.link ? 'active' : ''}`}
          key={item.name}
          href="/#" // this is a hack to apply the link styling without having to redo the css
          onClick={e => {
            e.preventDefault();
            this.props.history.push(`/dashboard/${item.link}`);
          }}
        >
          <div className="menu-item">{item.name}</div>
        </a>
      ));

    return (
      <PaperWrapper>
        <TwoColumn className="profile-summary">
          <Grid.Column width={4}>
            <Subsection className="profile-avatar">
              <FilesModal
                modalProps={{
                  dimmer: 'inverted',
                  trigger: (
                    <button style={{ cursor: 'pointer' }}>
                      <Avatar
                        src={
                          this.props.user.user.profile_image
                            ? this.props.user.user.profile_image
                            : profile.imageSource
                        }
                        size={150}
                        borderWidth={5}
                        style={{
                          margin: '40px auto 40px 80px',
                          display: 'block',
                        }}
                      />
                    </button>
                  ),
                }}
                formProps={{
                  onSubmit: formData => {
                    // console.log(formData);
                    this.props.dispatchAction({
                      type: USERS.PATCH.REQUESTED,
                      payload: { data: formData, id: this.props.user.user.id },
                      contentType: MULTIPART_FORM_DATA,
                    });
                  },
                }}
                file={
                  this.props.user.user.profile_image
                    ? this.props.user.user.profile_image
                    : profile.imageSource
                }
                fieldName="profile_image"
              />
            </Subsection>
          </Grid.Column>
          <Grid.Column
            className="profile-summary"
            width={12}
            verticalAlign="middle"
          >
            <TwoColumn>
              <Grid.Column width={10}>
                <Subsection style={{ textAlign: 'left' }}>
                  <h1>Hello, {this.props.user.user.long_first_name}</h1>
                  <h4>
                    {profile.numReviews} Reviews | {profile.numProjects}{' '}
                    Projects
                  </h4>
                </Subsection>
              </Grid.Column>
              <Grid.Column width={6}>
                <Subsection
                  style={{
                    display: currentTab === 'listings' ? 'inherit' : 'none',
                  }}
                >
                  <ListingModal
                    modalProps={{
                      dimmer: 'inverted',
                      trigger: (
                        <ButtonWrapper design="outline">
                          Add Listing
                        </ButtonWrapper>
                      ),
                    }}
                    formProps={{
                      onSubmit: formData => {
                        // const data = new FormData(formData.target);
                        const data = formData;
                        data.append(
                          'merchant',
                          this.props.user.LOAD_AUTH.data.merchantId,
                        );
                        this.createListing({ data });
                      },
                    }}
                    categories={
                      this.props[DASHBOARD_VIEW][CATEGORIES.MODEL].LIST
                    }
                    listing={null}
                    isCreate
                  />
                  <GalleryModal
                    modalProps={{
                      dimmer: 'inverted',
                      trigger: (
                        <ButtonWrapper design="outline">
                          Add Gallery
                        </ButtonWrapper>
                      ),
                    }}
                    formProps={{
                      onSubmit: formData => {
                        const data = formData;
                        this.props.dispatchAction({
                          type: GALLERIES.POST.REQUESTED,
                          payload: {
                            data,
                          },
                        });
                      },
                    }}
                    listings={this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST}
                    isCreate
                  />
                </Subsection>
              </Grid.Column>
            </TwoColumn>
          </Grid.Column>
        </TwoColumn>
        <Divider className="profile-divider" />
        <OneColumn className="profile-summary-nav">
          <Subsection style={{ paddingTop: 0, marginTop: 0 }}>
            <div className="ui secondary menu">{dashboardTabJsx}</div>
          </Subsection>
        </OneColumn>
      </PaperWrapper>
    );
  }

  createListing = payload => {
    this.props.dispatchAction({
      type: LISTINGS.POST.REQUESTED,
      payload,
      contentType: MULTIPART_FORM_DATA,
    });
  };
}
