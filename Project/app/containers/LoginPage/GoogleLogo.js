import React from 'react';
import { Image } from 'semantic-ui-react';
import GoogleLogoImage from '../../images/LoginPage/google_logo.svg';

export default class GoogleLogo extends React.PureComponent {
  render() {
    return <Image alt="Google Logo" src={GoogleLogoImage} {...this.props} />;
  }
}
