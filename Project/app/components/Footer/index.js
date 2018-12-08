import React from 'react';
import { Grid } from 'semantic-ui-react';
import CompanyLogo from '../CompanyAsset/CompanyLogo';
import FooterList from './FooterList';
import Subscribe from './Subscribe';
import { businessList, customerList, companyList } from './content';
import facebook_icon from '../../images/new-images/facebook.png';
import LogoImage from '../../images/SGHomeNeeds-Logo.png';
function Footer() {
  return (
    <div id="footer">
      <footer style={{ padding: '50px 100px', backgroundColor: '#fff' }} className="footer_main_container">
        <Grid stackable columns={5}>
          <Grid.Row>
            <Grid.Column>
              <img src={LogoImage} className="footer_logo" />
              <div style={{ marginBottom: '8px' }}>
                <a href="/#">Privacy Policy</a> | <a href="/#">Terms of Use</a>
              </div>
              <div style={{ marginBottom: '8px' }}>Follow Us:</div>
              <button
                className="ui circular basic icon button"
              >
                <img src={facebook_icon} height="25px" width="25px" className="footer_facebook_icon" /> 
              </button>
            </Grid.Column>
            <Grid.Column>
              <FooterList listData={businessList} />
            </Grid.Column>
            <Grid.Column>
              <FooterList listData={customerList} />
            </Grid.Column>
            <Grid.Column>
              <FooterList listData={companyList} />
            </Grid.Column>
            <Grid.Column>
              <Subscribe
                headerText={<h3>Subcribe with SGHomeNeeds</h3>}
                buttonText="Subscribe"
                buttonType="filled"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </footer>
      <footer>
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            border: 'solid 1px #eee',
          }}
        >
          © 2018 SGHomeNeeds. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
