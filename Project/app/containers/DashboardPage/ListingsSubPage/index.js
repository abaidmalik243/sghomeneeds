import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import { isEqual } from 'lodash';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import CardImage from '../../../components/Base/Card/CardImage';
import TwoColumn from '../../../components/Section/TwoColumn';
import ImageWrapper from '../../../components/Base/Image';
import {
  CATEGORIES,
  FILES,
  GALLERIES,
  LISTINGS,
} from '../../../actions/restApi';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import './styles.css';
import Divider from '../../../components/Base/Divider';
import ListingModal from '../ProfilePaper/ListingModal';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import GalleryModal from '../ProfilePaper/GalleryModal';

/* eslint-disable react/prefer-stateless-function */
export default class ListingsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    // TODO: uncomment when api is working
    const listings = this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST;
    // TODO: remove when api is working
    // const listings = defaultListings;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Listings & Galleries"
        tabLink="listings"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {listings && listings.count ? (
            listings.results.map(listing => (
              <div className="listing-group" key={listing.id}>
                <ListingModal
                  modalProps={{
                    dimmer: 'inverted',
                    trigger: (
                      <Card style={{ cursor: 'pointer' }}>
                        <CardContent>
                          <div className="listing-logo">
                            <ImageWrapper
                              width="100px"
                              height="100px"
                              src={
                                listing.logo ||
                                'http://via.placeholder.com/100x100'
                              }
                            />
                          </div>
                          <div className="listing-text">
                            <h3>{listing.name}</h3>
                            <div className="listing-description">
                              <p>
                                {/* TODO: Set description character limit on backend */}
                                {listing.description || generateText(200)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  }}
                  formProps={{
                    onSubmit: formData => {
                      const data = formData;
                      this.updateListing({ data, id: listing.slug });
                    },
                  }}
                  categories={this.props[DASHBOARD_VIEW][CATEGORIES.MODEL].LIST}
                  listing={listing}
                  isCreate={false}
                  dispatchAction={this.props.dispatchAction}
                  refreshListings={this.refreshListings}
                />
                <TwoColumn>
                  {listing.galleries.map(gallery => (
                    <Grid.Column key={v4()}>
                      <GalleryModal
                        modalProps={{
                          dimmer: 'inverted',
                          trigger: (
                            <Card className="listing-image">
                              {gallery.files.length > 0 && (
                                <CardImage
                                  source={gallery.files[0].file_field}
                                />
                              )}
                              <CardContent>
                                <h3>{gallery.wp_post_title}</h3>
                              </CardContent>
                            </Card>
                          ),
                        }}
                        formProps={{
                          onSubmit: formData => {
                            const data = formData;
                            this.props.dispatchAction({
                              type: GALLERIES.PATCH.REQUESTED,
                              payload: { data, id: gallery.id },
                              contentType: MULTIPART_FORM_DATA,
                            });
                          },
                        }}
                        listings={
                          this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST
                        }
                        dispatchAction={this.props.dispatchAction}
                        gallery={gallery}
                      />
                    </Grid.Column>
                  ))}
                </TwoColumn>
                <Divider />
              </div>
            ))
          ) : (
            <h3 className="no-listing">You have no listings.</h3>
          )}
        </SubPageContent>
      </SubPageWrapper>
    );
  }

  componentDidMount() {
    this.refreshListings();
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    let needRefresh = false;
    [LISTINGS.MODEL, GALLERIES.MODEL, FILES.MODEL, CATEGORIES.MODEL].forEach(
      model => {
        let prev = prevProps[DASHBOARD_VIEW][model].GET;
        let curr = this.props[DASHBOARD_VIEW][model].GET;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
        }
        prev = prevProps[DASHBOARD_VIEW][model].POST;
        curr = this.props[DASHBOARD_VIEW][model].POST;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
        }
        prev = prevProps[DASHBOARD_VIEW][model].DELETE;
        curr = this.props[DASHBOARD_VIEW][model].DELETE;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
        }
      },
    );
    const { merchantId: prevMerchantId } = prevProps.user.LOAD_AUTH.data;
    const { merchantId } = this.props.user.LOAD_AUTH.data;
    if (prevMerchantId !== merchantId) {
      needRefresh = true;
    }
    if (needRefresh) {
      this.refreshListings();
    }
  }

  updateListing = ({ data, id }) => {
    this.props.dispatchAction({
      type: LISTINGS.PATCH.REQUESTED,
      payload: { data, id },
      contentType: MULTIPART_FORM_DATA,
    });
  };
  refreshListings = () => {
    const { merchantId } = this.props.user.LOAD_AUTH.data;
    // const { merchantId } = { merchantId: 205 };
    if (merchantId) {
      this.props.dispatchAction({
        type: LISTINGS.LIST.REQUESTED,
        payload: { query: { merchant: merchantId } },
      });
    }
  };
}
