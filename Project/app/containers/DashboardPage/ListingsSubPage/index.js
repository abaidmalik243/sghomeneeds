import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import TwoColumn from '../../../components/Section/TwoColumn';
import ImageWrapper from '../../../components/Base/Image';
import OneColumn from '../../../components/Section/OneColumn';
import { LISTINGS } from '../../../actions/restApi';
import { defaultListings } from '../content';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';

/* eslint-disable react/prefer-stateless-function */
export default class ListingsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    let listings = this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST;
    if (listings === undefined) {
      listings = defaultListings;
    }
    return (
      <div style={{ display: currentTab === 'listings' ? 'inherit' : 'none' }}>
        <TwoColumn>
          <Grid.Column>
            <Subsection style={{ textAlign: 'left' }}>
              <h3>Listings & Galleries</h3>
              <p>{generateText(200)}</p>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            {listings.results.map(listing => (
              <Subsection style={{ textAlign: 'left' }} key={listing.key}>
                <OneColumn>
                  <Card>
                    <CardContent>
                      <TwoColumn>
                        <Grid.Column width={4}>
                          <ImageWrapper src={listing.logoImage} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                          <h3>{listing.name}</h3>
                          <p>{listing.description}</p>
                        </Grid.Column>
                      </TwoColumn>
                    </CardContent>
                  </Card>
                </OneColumn>
                <TwoColumn stackable={false}>
                  {
                    //   listing.images.map(image => (
                    //   <Grid.Column key={image.key}>
                    //     <Card style={{ marginBottom: 10 }}>
                    //       <CardImage source={image.imageSource} />
                    //       <CardContent>
                    //         <h3>{image.name}</h3>
                    //       </CardContent>
                    //     </Card>
                    //   </Grid.Column>
                    // ))
                  }
                </TwoColumn>
              </Subsection>
            ))}
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }

  componentWillMount() {
    const { merchantId } = this.props.user.LOAD_AUTH.data;
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: { query: `?merchant=${merchantId}` },
    });
  }
}
