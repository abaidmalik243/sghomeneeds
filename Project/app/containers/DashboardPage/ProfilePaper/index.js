import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import TwoColumn from '../../../components/Section/TwoColumn';
import Subsection from '../../../components/Section/Subsection';
import ImageWrapper from '../../../components/Base/Image';
import OneColumn from '../../../components/Section/OneColumn';
import Divider from '../../../components/Base/Divider';
import PaperWrapper from '../../../components/Base/Paper';
import ButtonWrapper from '../../../components/Base/Button';
import './styles.css';
import { listingForm } from './content';
import ListingModal from './ListingModal';
import { LISTINGS } from '../../../actions/restApi';

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
    const { profile, currentTab } = this.props;
    return (
      <PaperWrapper>
        <TwoColumn>
          <Grid.Column width={4}>
            <Subsection>
              <ImageWrapper
                src={profile.imageSource}
                rounded
                width="200px"
                height="200px"
                style={{ display: 'block', margin: 'auto' }}
              />
            </Subsection>
          </Grid.Column>
          <Grid.Column width={12}>
            <TwoColumn>
              <Grid.Column width={10}>
                <Subsection style={{ textAlign: 'left' }}>
                  <h1>Hello, {this.props.user.user.first_name}</h1>
                  <h3>
                    {profile.numReviews} Reviews | {profile.numProjects}{' '}
                    Projects
                  </h3>
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
                      // defaultOpen: true,
                      trigger: (
                        <ButtonWrapper design="outline">
                          Add Listing
                        </ButtonWrapper>
                      ),
                    }}
                    formProps={{
                      onSubmit: formData => {
                        const data = {};
                        listingForm.fields.forEach(field => {
                          const key = field.inputProps.name;
                          data[key] = formData.target[key].value;
                        });
                        this.createListing({ data, url: 'create' });
                      },
                    }}
                  />
                  <Modal
                    dimmer="inverted"
                    trigger={
                      <ButtonWrapper design="outline">
                        Add Gallery
                      </ButtonWrapper>
                    }
                  >
                    <h1>Gallery</h1>
                  </Modal>
                </Subsection>
              </Grid.Column>
            </TwoColumn>
          </Grid.Column>
        </TwoColumn>
        <OneColumn>
          <Subsection style={{ paddingTop: 0, marginTop: 0 }}>
            <Divider />
            <div className="ui secondary menu">
              <button
                onClick={() => {
                  this.props.history.push('/dashboard/account');
                }}
                className={`${currentTab === 'account' ? 'active' : ''} item`}
              >
                <div className="menu-item">Account Settings</div>
              </button>
              <button
                onClick={() => {
                  this.props.history.push('/dashboard/notifications');
                }}
                className={`${
                  currentTab === 'notifications' ? 'active' : ''
                } item`}
              >
                <div className="menu-item">Notification Setting</div>
              </button>
              <button
                onClick={() => {
                  this.props.history.push('/dashboard/favourites');
                }}
                className={`${
                  currentTab === 'favourites' ? 'active' : ''
                } item`}
              >
                <div className="menu-item">Favourites</div>
              </button>

              <button
                onClick={() => {
                  this.props.history.push('/dashboard/listings');
                }}
                className={`${currentTab === 'listings' ? 'active' : ''} item`}
              >
                <div className="menu-item">Listings & Galleries</div>
              </button>
              <button
                onClick={() => {
                  this.props.history.push('/dashboard/reviews');
                }}
                className={`${currentTab === 'reviews' ? 'active' : ''} item`}
              >
                <div className="menu-item">Reviews</div>
              </button>
              <button
                onClick={() => {
                  this.props.history.push('/dashboard/comments');
                }}
                className={`${currentTab === 'comments' ? 'active' : ''} item`}
              >
                <div className="menu-item">Comments</div>
              </button>
            </div>
          </Subsection>
        </OneColumn>
      </PaperWrapper>
    );
  }
  onToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  createListing = payload => {
    this.props.dispatchAction({ type: LISTINGS.POST.REQUESTED, payload });
  };
}
